import { Box, Container, } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar, openAddPlace, openWhiteboard, readyAddPlace } from './sliceSidebar';
import { setLookingPlaceId, setLookingPlace, setLookingMarker } from './sliceLookingPlace';
import { AddPin, GetPinList } from "./db/BackEnd";
import * as db from './db/BackEnd';

var map = null;
var heatmap = null;
var markers = [];
var weights = [];
const naver = window.naver;

//https://4sii.tistory.com/424
function Map({underage, adult, man, woman}){
  const [places, setPlaces] = useState(null);
  const dispatch = useDispatch();
  const mapElement = useRef(null);
  const sidebarState = useSelector(state => state.sidebar.sidebarState);
  const text = useSelector(state => state.sidebar.text);
  const [temporaryLocation, setTemporaryLocation] = useState(null);

function getMarkerIcon(weight, maxWeight){
  return `<div style="font-size: 30px; stroke: black; stroke-width: 10; color: rgb(255, ${102+(1-weight/maxWeight)*132}, ${102+(1-weight/maxWeight)*109})">
              <i class="fa-solid fa-location-dot"></i>
            </div>`
  }

  const updatePinList = () => {
    GetPinList((new_pin_data) => {
      console.log('Updated Pin List:', new_pin_data);
      setPlaces(new_pin_data);
      console.log('changed places:', places);
    })
  }


  useEffect(() => {
    if (!mapElement.current || !naver) return;

    //파이어베이스에서 데이터 받기
    GetPinList((data)=>setPlaces(data));

    //지도 생성
    const location = new naver.maps.LatLng(36.3721427, 127.36039);
    const mapOptions = {
      center: location,
      minZoom: 13,
      scaleControlOptions: {  //https://navermaps.github.io/maps.js.ncp/docs/naver.maps.ScaleControl.html
          position: naver.maps.Position.BOTTOM_RIGHT
      },
      scrollWheel: true,
      zoom: 13,
      zoomControl: true,
      zoomControlOptions: { position: naver.maps.Position.LEFT_BOTTOM }
    };
    map = new naver.maps.Map(mapElement.current, mapOptions);

    //열지도 추가
    naver.maps.Event.once(map, 'init', function() {
      heatmap = new naver.maps.visualization.HeatMap({
          map: map,
          data: weights,
          opacity: 1,
          radius: 15,
          colorMap: 'YIOrRd'
      });
    });
    
    //클릭 시 핫플 추가 창
    naver.maps.Event.addListener(map, 'click', (e) => {
      dispatch(readyAddPlace());
      setTemporaryLocation(e.coord);
    });
  }, []);


  //새로운 place 추가
  useEffect(() => {
    if(sidebarState === 'addplace' && temporaryLocation) {
      AddPin({name: text, LatLng: temporaryLocation, stamp: {'UM': 0, 'UW': 0, 'AM': 0, 'AW': 0}}, updatePinList);
      dispatch(closeSidebar());
      setTemporaryLocation(null); //db에서 가져와야 하는 데이터를 state로
    }
  }, [sidebarState, temporaryLocation]);

  
  //파이어 베이스에서 places를 받은 후에 실행 됨
  useEffect(() => {
    if(places===null) return;

    //heatmap 갱신
    if(heatmap===null) return;
    var maxWeight=0;
    weights=[];
    for(var i=0; i<Object.keys(places).length; i++){
      var weight = 1; //heatmap cognize weight=0 as none-weight, so weight=0 become max-weight
      if(underage&&man){
        weight+=Object.keys(places[Object.keys(places)[i]].stamp.UM).length;
      }
      if(underage&&woman){
        weight+=Object.keys(places[Object.keys(places)[i]].stamp.UW).length;
      }
      if(adult&&man){
        weight+=Object.keys(places[Object.keys(places)[i]].stamp.AM).length
      }
      if(adult&&woman){
        weight+=Object.keys(places[Object.keys(places)[i]].stamp.AW).length;
      }
      weights.push(new naver.maps.visualization.WeightedLocation(places[Object.keys(places)[i]].LatLng._lat, places[Object.keys(places)[i]].LatLng._lng, weight/100000));
      
      if(maxWeight<weight) maxWeight = weight;
    }
    heatmap.setData(weights);
    heatmap.redraw();

    //markers 갱신
    for(var i=0; i<markers.length; i++){
      markers[i].setMap(null);
    }
    markers = [];
    var zoom = map.getZoom();
    for(var i=0; i<Object.keys(places).length; i++){
      //마커 생성후 마커 리스트에 추가
      var marker = new naver.maps.Marker({
        position: places[Object.keys(places)[i]].LatLng,
        map,
        options: {visible: zoom<16 ? false : true},
        icon: {
          content: getMarkerIcon(weights[i].weight, maxWeight/100000),
          size: new naver.maps.Size(22, 35),
          anchor: new naver.maps.Point(11, 35)
        }
      });
      markers.push(marker);
      function onClickEvent(i){
        return function(){
          dispatch(openWhiteboard());
          dispatch(setLookingPlaceId(Object.keys(places)[i]));
          dispatch(setLookingPlace(places[Object.keys(places)[i]]));
          dispatch(setLookingMarker(markers[i]));
        }
      };
      naver.maps.Event.addListener(marker, 'click', onClickEvent(i));
    }
    
    

    //zoom 정도에 따른 지도 변경
    naver.maps.Event.addListener(map, 'zoom_changed', function(zoom) {
      if(zoom<=16){ //show heat map
        for(var i=0; i<markers.length; i++){
          markers[i].setOptions({visible: false});
        }
        heatmap.setOptions('opacity', 1);
        
      }
      else{ //show marker map
        for(var i=0; i<markers.length; i++){
          markers[i].setOptions({visible: true});
        }
        heatmap.setOptions('opacity', 0);
      }
    });
  }, [places]);

  //버튼 눌리면 weights 갱신
  useEffect(() => {
    if(heatmap===null) return;

    var maxWeight=0;
    for(var i=0; i<Object.keys(places).length; i++){
      var weight = 0;
      if(underage&&man){
        weight+=Object.keys(places[Object.keys(places)[i]].stamp.UM).length;
      }
      if(underage&&woman){
        weight+=Object.keys(places[Object.keys(places)[i]].stamp.UW).length;
      }
      if(adult&&man){
        weight+=Object.keys(places[Object.keys(places)[i]].stamp.AM).length
      }
      if(adult&&woman){
        weight+=Object.keys(places[Object.keys(places)[i]].stamp.AW).length;
      }
      weights[i].weight = weight/100000;

      if(maxWeight<weight) maxWeight = weight;
    }
    heatmap.setData(weights);
    heatmap.redraw();

    //마커 색갱신
    for(var i=0; i<markers.length; i++){
      markers[i].setIcon({
          content: getMarkerIcon(weights[i].weight, maxWeight/100000),
          size: new naver.maps.Size(22, 35),
          anchor: new naver.maps.Point(11, 35)
      });
    }
  }, [underage, adult, man, woman]);

  return (
    <Container ref={mapElement} maxWidth={false} sx={{width: 1, height: 1, m: 0, p: 0}}>
    </Container>
  );
};


export default Map;

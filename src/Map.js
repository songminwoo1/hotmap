import { Box, Container, } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar, openAddPlace, openWhiteboard, readyAddPlace } from './sliceSidebar';
import { setLookingPlace } from './sliceLookingPlace';
import { AddPin, GetPinList } from "./db/BackEnd";
import AddPlace from './AddPlace';
import * as db from './db/BackEnd';

var map = null;
const naver = window.naver;

//pin definition
var tmp = [
  {'ID': 1234, 'name': '한기원', 'LatLng': {'x': 127.360221, 'y': 36.3954377, '_lat': 36.3954377, '_lng': 127.360221}},
  {'ID': 4321, 'name': '투썸', 'LatLng': {'x': 127.355221, 'y': 36.3854377, '_lat': 36.3954377, '_lng': 127.360221}},
]

//https://4sii.tistory.com/424
function Map(){
  const [markers, setMarkers] = useState(tmp);
  const dispatch = useDispatch();
  const mapElement = useRef(null);
  const sidebarState = useSelector(state => state.sidebar.sidebarState);
  const text = useSelector(state => state.sidebar.text);
  const [temporaryLocation, setTemporaryLocation] = useState(null);

  useEffect(() => {
    //파이어베이스에서 데이터 받기
    //GetPinList((data)=>setMarkers(data));

    
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
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

    //지도 생성
    map = new naver.maps.Map(mapElement.current, mapOptions);

    //열지도 추가
    console.log('dot');
    var data = [
      new naver.maps.LatLng(36.3721427,127.360394),
      new naver.maps.LatLng(36.3741427,127.360394),
      new naver.maps.LatLng(36.3771427,127.360394),
      new naver.maps.LatLng(36.3711427,127.360394),
      new naver.maps.LatLng(36.3781427,127.360394),
    ];
    naver.maps.onJSContentLoaded = function() {
      var heatmap = new naver.maps.visualization.HeatMap({
          map: map,
          data: data
      });
    };

    //클릭 시 핫플 추가 창
    naver.maps.Event.addListener(map, 'click', (e) => {
      dispatch(readyAddPlace());
      setTemporaryLocation(e.coord);
    });

    //사이드바를 불러오는 임시 이벤트
    naver.maps.Event.addListener(map, 'keydown', function(e) {
      var keyboardEvent = e.keyboardEvent,
          keyCode = keyboardEvent.keyCode || keyboardEvent.which;


      if (keyCode === 48) {
          keyboardEvent.preventDefault();
          dispatch(openWhiteboard());
      }
    });

  }, []);

  useEffect(() => {
    if(sidebarState === 'addplace' && temporaryLocation) {
      // Add a marker at the temporarily saved location
      const marker = new naver.maps.Marker({
        position: temporaryLocation,
        map,
      });
      // Change the state to 'none' after adding the pin
      
      AddPin({name: text, LatLng: temporaryLocation}, () => {
        GetPinList(()=>{});
        dispatch(closeSidebar());
        setTemporaryLocation(null);
      });
      
    }
  }, [sidebarState, temporaryLocation]);

  //마커 추가. 파이어 베이스에서 DB를 받은 후에 실행 됨
  useEffect(() => {
    //마커 추가
    console.log(markers);
    for(var marker of markers){
      if(marker.data=='dummy') continue;
      console.log(marker)
      var m = new naver.maps.Marker({
        position: marker.LatLng,
        map,
      });
      naver.maps.Event.addListener(m, 'click', ()=>{
        dispatch(openWhiteboard());
        dispatch(setLookingPlace({m, marker}));
      });
    }
  }, [markers]);


  return (
    <Container ref={mapElement} maxWidth={false} sx={{width: 1, height: 1, m: 0, p: 0}}>
    </Container>
  );
};


export default Map;
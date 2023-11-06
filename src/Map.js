import { Box, Container, } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { readyAddPlace, openAddPlace } from './slice';

var map = null;
const naver = window.naver;


function addMarker(e, dispatch){
  dispatch(readyAddPlace());
  var marker = new naver.maps.Marker({
    position: e.coord,
    map: map
  });
}

//https://4sii.tistory.com/424
function Map(){
  const [markers, setMarkers] = useState([]);
  const dispatch = useDispatch();
  const mapElement = useRef(null);
  const sidebarState = useSelector(state => state.sidebar.sidebarState);
  const clickCoordinate = useRef(null);

  useEffect(() => {
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

    //마커 추가
    console.log(markers);
    setMarkers([{"lat": 36.3721427, "lng": 127.36039}, {"lat": 36.3731427, "lng": 127.36039}]);
    for(var marker of markers){
      console.log(marker);
      new naver.maps.Marker({
        position: new naver.maps.LatLng(marker.lat, marker.lng),
        map,
      });
    }

    //클릭 시 마커 추가 이벤트
    naver.maps.Event.addListener(map, 'click', (e)=>{
      dispatch(readyAddPlace())
      clickCoordinate.current = e.coord;
    });

  }, []);
  //https://navermaps.github.io/maps.js.ncp/docs/tutorial-Visualization.html


  return (
    <Container ref={mapElement} maxWidth={false} sx={{width: 1, height: 1, m: 0, p: 0}}>
      {sidebarState === 'addplace' && clickCoordinate.current && (
        // Render a marker at the initial click coordinates
        new naver.maps.Marker({
          position: clickCoordinate.current,
          map: map,
        })
      )}
    </Container>
  );
};


export default Map;
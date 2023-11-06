import { Box, Container, } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar, openAddPlace, openWhiteboard, readyAddPlace } from './slice';

var map = null;
const naver = window.naver;

//https://4sii.tistory.com/424
function Map(){
  const [markers, setMarkers] = useState([]);
  const dispatch = useDispatch();
  const mapElement = useRef(null);
  const sidebarState = useSelector(state => state.sidebar.sidebarState);
  const [temporaryLocation, setTemporaryLocation] = useState(null);

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
  //https://navermaps.github.io/maps.js.ncp/docs/tutorial-Visualization.html


  return (
    <Container ref={mapElement} maxWidth={false} sx={{width: 1, height: 1, m: 0, p: 0}}>
      {sidebarState === 'addplace' && temporaryLocation && (() => {
      // Add a marker at the temporarily saved location
      const marker = new naver.maps.Marker({
        position: temporaryLocation,
        map,
      });

      // Change the state to 'none' after adding the pin
      dispatch(closeSidebar());
      // Clear the temporary location
      setTemporaryLocation(null);
    })()}
    </Container>
  );
};


export default Map;
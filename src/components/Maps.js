import React, { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
// import '../css/map.scss';
import '../css/map.css';
const { kakao } = window;

// const { kakao } = window;
// let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
// var keywords = '애견동반카페';

// const Map = () => {
//   const oneRef = useRef();
//   const twoRef = useRef();
//   const threeRef = useRef();
//   const fourRef = useRef();

//   const onClick = (e) => {
//     if (e.target.name == '애견동반카페') {
//       keywords = oneRef.current.name;
//       console.log(typeof keywords);
//       console.log(oneRef.current.name);
//       return keywords;
//     } else if (e.target.name == '동물병원') {
//       keywords = twoRef.current.name;
//       console.log(twoRef.current.name);
//       return keywords;
//     } else if (e.target.name == '애견미용실') {
//       keywords = threeRef.current.name;
//       console.log(threeRef.current.name);
//       return keywords;
//     } else if (e.target.name == '애견동반식당') {
//       keywords = fourRef.current.name;
//       console.log(fourRef.current.name);
//       return keywords;
//     }
//   };
//   useEffect(() => {
//     var container = document.getElementById('map');
//     var options = {
//       center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
//       level: 3,
//     };
//     var map = new kakao.maps.Map(container, options);

//     // 장소 검색 객체를 생성
//     const ps = new kakao.maps.services.Places();

//     // 키워드로 장소를 검색
//     ps.keywordSearch(keywords, placesSearchCB);

//     // 키워드 검색 완료 시 호출되는 콜백함수
//     function placesSearchCB(data, status, pagination) {
//       if (status === kakao.maps.services.Status.OK) {
//         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//         // LatLngBounds 객체에 좌표를 추가
//         let bounds = new kakao.maps.LatLngBounds();

//         for (let i = 0; i < data.length; i++) {
//           displayMarker(data[i]);
//           bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
//         }

//         // 검색된 장소 위치를 기준으로 지도 범위를 재설정
//         map.setBounds(bounds);
//       }
//     }

//     // 지도에 마커를 표시하는 함수
//     function displayMarker(place) {
//       // 마커를 생성하고 지도에 표시
//       let marker = new kakao.maps.Marker({
//         map: map,
//         position: new kakao.maps.LatLng(place.y, place.x),
//       });

//       // 마커에 클릭이벤트를 등록
//       kakao.maps.event.addListener(marker, 'click', function () {
//         // 마커를 클릭하면 장소명이 인포윈도우에 표출
//         infowindow.setContent(
//           '<div style="padding:5px;font-size:12px;">' +
//             place.place_name +
//             '</div>',
//         );
//         infowindow.open(map, marker);
//       });
//     }
//   }, [keywords]);

//   return (
//     <>
//       <form className="search">
//         <input type="text" placeholder="현재위치를 입력해주세요" />
//         <input type="submit" value="검색" />
//       </form>
//       <div className="category">
//         <input
//           type="button"
//           name="애견동반카페"
//           value="카페"
//           ref={oneRef}
//           onClick={onClick}
//         />
//         <input
//           type="button"
//           name="동물병원"
//           value="병원"
//           ref={twoRef}
//           onClick={onClick}
//         />
//         <input
//           type="button"
//           name="애견미용실"
//           value="미용실"
//           ref={threeRef}
//           onClick={onClick}
//         />
//         <input
//           type="button"
//           name="애견동반식당"
//           value="식당"
//           ref={fourRef}
//           onClick={onClick}
//         />
//       </div>
//       <div className="mapContent">
//         <div
//           id="map"
//           style={{
//             margin: '0 auto',
//             width: '80%',
//             height: '600px',
//           }}
//         ></div>
//       </div>
//     </>
//   );
// };

// export default Map;

// // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
// var placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }),
//   contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
//   markers = [], // 마커를 담을 배열입니다
//   currCategory = ''; // 현재 선택된 카테고리를 가지고 있을 변수입니다

// const Map = () => {
//   useEffect(() => {
//     var mapContainer = document.getElementById('map'), // 지도를 표시할 div
//       mapOption = {
//         center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
//         level: 5, // 지도의 확대 레벨
//       };

//     // 지도를 생성합니다
//     var map = new kakao.maps.Map(mapContainer, mapOption);

//     // 장소 검색 객체를 생성합니다
//     var ps = new kakao.maps.services.Places(map);

//     // 지도에 idle 이벤트를 등록합니다
//     kakao.maps.event.addListener(map, 'idle', searchPlaces);

//     // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
//     contentNode.className = 'placeinfo_wrap';

//     // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
//     // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
//     addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
//     addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

//     // 커스텀 오버레이 컨텐츠를 설정합니다
//     placeOverlay.setContent(contentNode);

//     // 각 카테고리에 클릭 이벤트를 등록합니다
//     addCategoryClickEvent();

//     // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
//     function addEventHandle(target, type, callback) {
//       if (target.addEventListener) {
//         target.addEventListener(type, callback);
//       } else {
//         target.attachEvent('on' + type, callback);
//       }
//     }

//     // 카테고리 검색을 요청하는 함수입니다
//     function searchPlaces() {
//       if (!currCategory) {
//         return;
//       }

//       // 커스텀 오버레이를 숨깁니다
//       placeOverlay.setMap(null);

//       // 지도에 표시되고 있는 마커를 제거합니다
//       removeMarker();

//       ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
//     }

//     // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
//     function placesSearchCB(data, status, pagination) {
//       if (status === kakao.maps.services.Status.OK) {
//         // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
//         displayPlaces(data);
//       } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
//         // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
//       } else if (status === kakao.maps.services.Status.ERROR) {
//         // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
//       }
//     }

//     // 지도에 마커를 표출하는 함수입니다
//     function displayPlaces(places) {
//       // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
//       // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
//       var order = document
//         .getElementById(currCategory)
//         .getAttribute('data-order');

//       for (var i = 0; i < places.length; i++) {
//         // 마커를 생성하고 지도에 표시합니다
//         var marker = addMarker(
//           new kakao.maps.LatLng(places[i].y, places[i].x),
//           order,
//         );

//         // 마커와 검색결과 항목을 클릭 했을 때
//         // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
//         (function (marker, place) {
//           kakao.maps.event.addListener(marker, 'click', function () {
//             displayPlaceInfo(place);
//           });
//         })(marker, places[i]);
//       }
//     }

//     // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
//     function addMarker(position, order) {
//       var imageSrc =
//           'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
//         imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
//         imgOptions = {
//           spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
//           spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
//           offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
//         },
//         markerImage = new kakao.maps.MarkerImage(
//           imageSrc,
//           imageSize,
//           imgOptions,
//         ),
//         marker = new kakao.maps.Marker({
//           position: position, // 마커의 위치
//           image: markerImage,
//         });

//       marker.setMap(map); // 지도 위에 마커를 표출합니다
//       markers.push(marker); // 배열에 생성된 마커를 추가합니다

//       return marker;
//     }

//     // 지도 위에 표시되고 있는 마커를 모두 제거합니다
//     function removeMarker() {
//       for (var i = 0; i < markers.length; i++) {
//         markers[i].setMap(null);
//       }
//       markers = [];
//     }

//     // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
//     function displayPlaceInfo(place) {
//       var content =
//         '<div class="placeinfo">' +
//         '   <a class="title" href="' +
//         place.place_url +
//         '" target="_blank" title="' +
//         place.place_name +
//         '">' +
//         place.place_name +
//         '</a>';

//       if (place.road_address_name) {
//         content +=
//           '    <span title="' +
//           place.road_address_name +
//           '">' +
//           place.road_address_name +
//           '</span>' +
//           '  <span class="jibun" title="' +
//           place.address_name +
//           '">(지번 : ' +
//           place.address_name +
//           ')</span>';
//       } else {
//         content +=
//           '    <span title="' +
//           place.address_name +
//           '">' +
//           place.address_name +
//           '</span>';
//       }

//       content +=
//         '    <span class="tel">' +
//         place.phone +
//         '</span>' +
//         '</div>' +
//         '<div class="after"></div>';

//       contentNode.innerHTML = content;
//       placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
//       placeOverlay.setMap(map);
//     }

//     // 각 카테고리에 클릭 이벤트를 등록합니다
//     function addCategoryClickEvent() {
//       var category = document.getElementById('category'),
//         children = category.children;

//       for (var i = 0; i < children.length; i++) {
//         children[i].onclick = onClickCategory;
//       }
//     }

//     // 카테고리를 클릭했을 때 호출되는 함수입니다
//     function onClickCategory() {
//       var id = this.id,
//         className = this.className;

//       placeOverlay.setMap(null);

//       if (className === 'on') {
//         currCategory = '';
//         changeCategoryClass();
//         removeMarker();
//       } else {
//         currCategory = id;
//         changeCategoryClass(this);
//         searchPlaces();
//       }
//     }

//     // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
//     function changeCategoryClass(el) {
//       var category = document.getElementById('category'),
//         children = category.children,
//         i;

//       for (i = 0; i < children.length; i++) {
//         children[i].className = '';
//       }

//       if (el) {
//         el.className = 'on';
//       }
//     }
//   }, []);
//   return (
//     <div>
//       <div className="map_wrap">
//         <div
//           id="map"
//           style={{
//             width: '100%',
//             height: '100%',
//             position: 'relative',
//             overflow: 'hidden',
//           }}
//         ></div>
//         <ul id="category">
//           <li id="BK9" data-order="0">
//             <span className="category_bg bank"></span>
//             은행
//           </li>
//           <li id="MT1" data-order="1">
//             <span className="category_bg mart"></span>
//             마트
//           </li>
//           <li id="PM9" data-order="2">
//             <span className="category_bg pharmacy"></span>
//             약국
//           </li>
//           <li id="OL7" data-order="3">
//             <span className="category_bg oil"></span>
//             주유소
//           </li>
//           <li id="CE7" data-order="4">
//             <span className="category_bg cafe"></span>
//             카페
//           </li>
//           <li id="CS2" data-order="5">
//             <span className="category_bg store"></span>
//             편의점
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// var searchname = '서울';
// const Map = () => {
//   const searchRef = useRef();
//   const searchPlace = (e) => {
//     e.preventDefault();
//     searchname = searchRef.current.value;
//     console.log(searchname);
//   };
//   useEffect(() => {
//     var mapContainer = document.getElementById('map'), // 지도를 표시할 div
//       mapOption = {
//         center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
//         level: 3, // 지도의 확대 레벨
//       };

//     // 지도를 생성합니다
//     var map = new kakao.maps.Map(mapContainer, mapOption);
//     // 주소-좌표 변환 객체를 생성합니다
//     var geocoder = new kakao.maps.services.Geocoder();

//     // 주소로 좌표를 검색합니다
//     geocoder.addressSearch(searchname, function (result, status) {
//       // 정상적으로 검색이 완료됐으면
//       if (status === kakao.maps.services.Status.OK) {
//         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

//         // 결과값으로 받은 위치를 마커로 표시합니다
//         var marker = new kakao.maps.Marker({
//           map: map,
//           position: coords,
//         });

//         // 인포윈도우로 장소에 대한 설명을 표시합니다
//         // var infowindow = new kakao.maps.InfoWindow({
//         //   content:
//         //     '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
//         // });
//         // infowindow.open(map, marker);

//         // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
//         map.setCenter(coords);
//       }
//     });
//   }, []);

//   return (
//     <div>
//       <form className="search" onSubmit={searchPlace}>
//         <input
//           type="text"
//           className="searchInput"
//           placeholder="현재 위치를 입력하여주세요"
//           ref={searchRef}
//         ></input>
//         <input type="submit" value="검색"></input>
//       </form>
//       <div id="map" style={{ width: '100 %', height: '350px' }}></div>
//     </div>
//   );
// };

function Maps() {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });
  const [searchAddress, SetSearchAddress] = useState();
  const oneRef = useRef();
  const twoRef = useRef();
  const threeRef = useRef();
  const fourRef = useRef();

  // 주소 입력후 검색 클릭 시 원하는 주소로 이동
  const SearchMap = () => {
    const geocoder = new kakao.maps.services.Geocoder();

    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        setState({
          center: { lat: newSearch.y, lng: newSearch.x },
        });
      }
    };
    geocoder.addressSearch(`${searchAddress}`, callback);
  };

  const handleSearchAddress = (e) => {
    SetSearchAddress(e.target.value);
  };

  const SearchCategory = (e) => {
    if (e.target.name == '애견동반카페') {
      var keywords = '';
      keywords = oneRef.current.name;
      // console.log(oneRef.current.name);
      return keywords;
    } else if (e.target.name == '동물병원') {
      keywords = twoRef.current.name;
      // console.log(twoRef.current.name);
      return keywords;
    } else if (e.target.name == '애견미용실') {
      keywords = threeRef.current.name;
      // console.log(threeRef.current.name);
      return keywords;
    } else if (e.target.name == '애견동반식당') {
      keywords = fourRef.current.name;
      // console.log(fourRef.current.name);
      return keywords;
    }

    const ps = new kakao.maps.services.Places();
    const placesSearchCB = function (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = data[0];
        setState({
          center: { lat: newSearch.y, lng: newSearch.x },
        });
      }
    };
    console.log(keywords);
    ps.keywordSearch(keywords, placesSearchCB);
  };

  return (
    <>
      <div>
        <input onChange={handleSearchAddress}></input>
        <button placeholder="현재 위치를 입력하여 주세요" onClick={SearchMap}>
          검색
        </button>
        <div>
          <input
            type="button"
            name="애견동반카페"
            value="카페"
            ref={oneRef}
            onClick={SearchCategory}
          />
          <input
            type="button"
            name="동물병원"
            value="병원"
            ref={twoRef}
            onClick={SearchCategory}
          />
          <input
            type="button"
            name="애견미용실"
            value="미용실"
            ref={threeRef}
            onClick={SearchCategory}
          />
          <input
            type="button"
            name="애견동반식당"
            value="식당"
            ref={fourRef}
            onClick={SearchCategory}
          />
        </div>
      </div>
      <Map // 지도를 표시할 Container
        center={state.center}
        isPanto={state.isPanto}
        style={{
          // 지도의 크기
          width: '100%',
          height: '450px',
        }}
        level={3}
      >
        <MapMarker position={state.center}>
          <div
            style={{
              color: '#000',
            }}
          >
            검색위치
          </div>
        </MapMarker>
      </Map>
    </>
  );
}

export default Maps;

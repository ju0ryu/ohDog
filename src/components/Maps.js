import React, { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import '../css/map.scss';
// import '../css/map.css';
import { useNavigate } from 'react-router';
import axios from 'axios';
const { kakao } = window;

function Maps() {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });
  const [searchAddress, SetSearchAddress] = useState();
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const oneRef = useRef();
  const twoRef = useRef();
  const threeRef = useRef();
  const fourRef = useRef();
  const navigate = useNavigate();
  const userid = window.sessionStorage.getItem('id');

  useEffect(() => {
    window.sessionStorage.getItem('id');
    if (window.sessionStorage.getItem('id') == null) {
      alert('로그인 후 이용하여 주세요');
      navigate('/');
    }

    axios
      .post('http://localhost:8008/mdata', { userid })
      .then((res) => {
        const { data } = res;
        SetSearchAddress(data[0].addr);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    console.log(searchAddress);
    SearchMap();
  }, [searchAddress]);

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

  const setCategory = (e) => {
    if (e.target.name == '주변 애견 카페') {
      var keywords = '';
      keywords = oneRef.current.name;
      // console.log(oneRef.current.name);
      return SearchCategory(keywords);
    } else if (e.target.name == '주변 동물 병원') {
      keywords = twoRef.current.name;
      // console.log(twoRef.current.name);
      return SearchCategory(keywords);
    } else if (e.target.name == '주변 애견 미용실') {
      keywords = threeRef.current.name;
      // console.log(threeRef.current.name);
      return SearchCategory(keywords);
    } else if (e.target.name == '주변 애견동반 식당') {
      keywords = fourRef.current.name;
      // console.log(fourRef.current.name);
      return SearchCategory(keywords);
    }
  };

  const SearchCategory = (keywords) => {
    const ps = new kakao.maps.services.Places();
    const placesSearchCB = function (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          console.log(data);
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            // content: data[i].place_name,
            content: {
              name: data[i].place_name,
              address: data[i].road_address_name,
              phone: data[i].phone,
              url: data[i].place_url,
            },
          });
        }
        setMarkers(markers);
      }
    };
    ps.keywordSearch(keywords, placesSearchCB, {
      location: new kakao.maps.LatLng(state.center.lat, state.center.lng),
      radius: 2000, // 주석달기
    });
  };

  return (
    <>
      <div className="maps">
        <div className="headers">
          <p>주변시설 찾기</p>
        </div>
        <div className="searchInput">
          <input
            placeholder="현재 위치를 입력하여 주세요"
            onChange={handleSearchAddress}
          ></input>
          <button onClick={SearchMap}>검색</button>
        </div>
        <div className="category">
          <input
            type="button"
            name="주변 애견 카페"
            value="카페"
            ref={oneRef}
            onClick={setCategory}
          />
          <input
            type="button"
            name="주변 동물 병원"
            value="병원"
            ref={twoRef}
            onClick={setCategory}
          />
          <input
            type="button"
            name="주변 애견 미용실"
            value="미용실"
            ref={threeRef}
            onClick={setCategory}
          />
          <input
            type="button"
            name="주변 애견동반 식당"
            value="식당"
            ref={fourRef}
            onClick={setCategory}
          />
        </div>
      </div>
      <div className="map">
        <Map // 지도를 표시할 Container
          center={state.center}
          isPanto={state.isPanto}
          style={{
            // 지도의 크기
            width: '100%',
            height: '600px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255)',
            boxShadow: '1px 1px 1px 1px gray',
          }}
          level={5}
        >
          {markers.map((marker) => (
            <MapMarker
              style={{ border: 'none' }}
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && (
                <div className="marker">
                  {/* {marker.content} */}
                  <p className="mTitle">
                    {marker.content.name ? marker.content.name : '주소 : '}
                  </p>
                  <p className="mAddr">{marker.content.address}</p>
                  <p className="mPhone">
                    {marker.content.phone
                      ? 'tel : ' + marker.content.phone
                      : 'tel :'}
                  </p>
                  <a
                    className="mURL"
                    href={marker.content.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {/* {marker.content.url} */} 상세보기
                  </a>
                </div>
              )}
            </MapMarker>
          ))}
        </Map>
      </div>
    </>
  );
}

export default Maps;

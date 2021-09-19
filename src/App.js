import "./App.css";
import { useEffect, useState } from "react";
import Map from "./components/Map/Map";
import MapManager from "./scripts/MapManager";
import Overlay from "./components/Overlay/Overlay";
import DetailsCard from "./components/Wrappers/DetailsCard";
import CountryInfo from "./components/CountryInfoModal/CountryInfo";
import NavBar from "./components/NavBar/NavBar";
import OffcanvasMenu from "./components/LeftMenu/OffcanvasMenu";
import OverlayLoading from "./components/Overlay/OverlayLoading";
import { setCountries } from "./redux/actions/countryActions";
import { useDispatch } from "react-redux";

function App() {
  const [showLoadOverlay, setShowLoadOverlay] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [showMapCenter, setShowMapCenter] = useState(false);
  const [markerDetails, setMarkerDetails] = useState({});
  const dispatch = useDispatch();

  const showMarkerDetails = (markerData) => {
    setMarkerDetails(markerData);
    setShowDetails(true);
  };

  const handleDetailsClose = () => {
    setShowDetails(false);
  };

  useEffect(() => {
    const countryListPromise = MapManager.getCountries();
    countryListPromise.then((res) => {
      if (!res.errorMessage) {
        const countryPromises = [];
        const data = res.data;
        data.forEach((countryData) => {
          countryPromises.push(MapManager.getCountryInfo(countryData.url));
        });
        Promise.all(countryPromises).then((values) => {
          const mapMarkers = [];
          values.forEach((countryInfo) => {
            mapMarkers.push(countryInfo.data);
          });
          setShowLoadOverlay(false);
          setShowMapCenter(true);
          MapManager.enableMapControls();
          dispatch(setCountries(mapMarkers));
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <NavBar></NavBar>
      <OffcanvasMenu
        position="start"
        id="offCanvasLeftMenu"
        title="Find nearby places"
      ></OffcanvasMenu>
      {showLoadOverlay ? (
        <Overlay backgroundColor="rgba(0, 0, 0, 0.7)" fullScreen={true}>
          <OverlayLoading></OverlayLoading>
        </Overlay>
      ) : null}
      {showDetails ? (
        <DetailsCard>
          <CountryInfo
            data={markerDetails}
            onDetailsClose={handleDetailsClose}
          />
        </DetailsCard>
      ) : null}
      <Map
        onShowMarkerDetails={showMarkerDetails}
        showMapCenter={showMapCenter}
      ></Map>
    </div>
  );
}

export default App;

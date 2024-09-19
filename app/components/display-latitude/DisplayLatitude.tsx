import { useGeolocation } from "@uidotdev/usehooks";

function DisplayLatitude() {
  const state = useGeolocation();

  if (state.error) {
    return <h1>something went wrong</h1>;
  }

  return state.loading ? <h1>loading...</h1> : <h1>{state.latitude}</h1>;
}

export default DisplayLatitude;

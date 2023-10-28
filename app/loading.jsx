import Loading from "./components/Loading/page";

function loading() {
  return (
    <div class="relative h-screen w-full">
      <div class="absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2">
        <Loading />
      </div>
    </div>
  );
}

export default loading;

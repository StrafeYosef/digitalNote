import boat from "../../assets/boat.png";
import seaAnimal from "../../assets/seaAnimal.png";

function Home() {
  return (
    <div className="combine home" style={{height: '94%'}}>
      <div className="combine flex jcac" style={{ width: "100%" }}>
        <p className="title gradientText">
          Лечебная косметика - лазерная эпиляция
        </p>
      </div>
      <img className="theBoat" src={boat} />
        <img className="seaAnimalTwo" src={seaAnimal} />
    </div>
  );
}

export default Home;

//react
import { useEffect , useState } from "react";
//styles
import * as C from "./app.styles"
//Sources
import logoImage from "./assets/devmemory_logo.png"
import restartIcon from "./assets/svgs/restart.svg"
import { Items } from "./data/items"
//Types
import { GridItemType } from "./types/GridItemType";
//Components
import { InfoItem } from "./components/InfoItem";
import { Button } from "./components/Button";
import { GridItem } from "./components/GridItem";
//helpers
import { FormatTimeElapsed } from "./helpers/FormatTimeElapsed";




const App = ()=>{

  const [playing , setPlaying] = useState<boolean>(false);
  const [timeLapsed , setTimeLapsed] = useState<number>(0);
  const [moveCount , setMoveCount] = useState<number>(0);
  const [showCount , setShowCount] = useState<number>(0);
  const [gridItems , setGridItems] = useState<GridItemType[]>([]);

  useEffect(()=>resetAndCreateGrid(),[]);


  useEffect(()=>{
    const timer = setInterval(()=>{
      if(playing) setTimeLapsed(timeLapsed +1);
    },1000);
    return ()=> clearInterval(timer);
  },[playing, timeLapsed])


  useEffect(()=>{
    if(showCount === 2){
      let opened = gridItems.filter(item => item.shown === true);
      if(opened.length === 2){

        //verificação 1
        if(opened[0].item === opened[1].item){
          let tempGrid = [...gridItems];
          for(let i in tempGrid){
            if(tempGrid[i].shown){
              tempGrid[i].permanentShown = true;
              tempGrid[i].shown = false;
            }
          }
          setGridItems(tempGrid);
          setShowCount(0);
      } else {
        //verificação 2
         setTimeout(()=>{
          let tempGrid = [...gridItems];
          for(let i in tempGrid){
            tempGrid[i].shown = false;
          }
          setGridItems(tempGrid);
          setShowCount(0);
         }, 1000 );
      }   
                  
                    
      setMoveCount(moveCount => moveCount + 1)
    }
  }
},[showCount , gridItems]);

  useEffect(()=>{
    if(moveCount > 0 && gridItems.every(item=> item.permanentShown === true)){
      setPlaying(false);
    }
  },[moveCount , gridItems])


  const resetAndCreateGrid = ()=>{
    //resetar as contagens
    setTimeLapsed(0);
    setMoveCount(0);
    setShowCount(0);

    //criar o grid
    let tempGrid:GridItemType[] = [];
    for(let i = 0; i < (Items.length *2);i++){tempGrid.push({
      item: null, shown: false, permanentShown: false, 
    })};
    //preencher o grid
    for(let w = 0; w < 2; w++){
      for(let i=0; i< Items.length ; i++ ){
        let pos = -1;
        while(pos < 0 || tempGrid[pos].item !== null){
         pos = Math.floor(Math.random() * (Items.length *2));
        }
        tempGrid[pos].item = i;
      };
    };

    //Jogar no state
    setGridItems(tempGrid);
    //começar o jogo
    setPlaying(true);
  };

  const handleItemClick= (index:number)=>{
    if(playing && index !== null && showCount < 2){
      let tempGrid = [...gridItems];

      if(tempGrid[index].permanentShown === false && tempGrid[index].shown === false){
        tempGrid[index].shown = true;
        setShowCount(showCount + 1);
      }

      setGridItems(tempGrid);
    }
  };

  return (
    <C.Container>
      <C.Info>


        <C.LogoLink href="">
          <img src={logoImage} width={200} alt="" />
        </C.LogoLink>


        <C.InfoArea>
          <InfoItem label="Tempo" value={FormatTimeElapsed(timeLapsed)} />
          <InfoItem label="Movimentos" value={`${moveCount}`} />
        </C.InfoArea>


        <Button label="Reiniciar"  icon={restartIcon} onClick={resetAndCreateGrid} />
      </C.Info>



      <C.GridArea>
        <C.Grid>
          {gridItems.map((item , index)=>(
            <GridItem 
              key={index}
              item={item}
              onClick={()=> handleItemClick(index)}
             />
            ))}
        </C.Grid>
      </C.GridArea>

    </C.Container>
  );
};



export default App;
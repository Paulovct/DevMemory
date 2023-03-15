import { GridItemType } from "../../types/GridItemType";
import * as C from "./styles"
import b7svg from "../../assets/svgs/b7.svg"
import { Items } from "../../data/items";

type Props ={
	item:GridItemType;
	onClick:()=> void;
}

export const GridItem = ({item , onClick}:Props)=>{
	return (
		<C.Container
		onClick={onClick}
		showBackground={item.permanentShown || item.shown}
		>
			{item.permanentShown === false && item.shown === false &&
				<C.Icon src={b7svg} alt="" opacity={.1}/>
			}
			{item.permanentShown || (item.shown && item.item !== null) &&
				<C.Icon src={Items[item.item].icon} alt="" />
			}
		</C.Container>
	);
};
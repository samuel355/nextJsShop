import { BounceLoader } from "react-spinners"

export default function Spinner(){
    return(
        <BounceLoader
            size={40}
            color={'#1e3a8a'}  
            speedMultiplier={2}     
        />
    )
}
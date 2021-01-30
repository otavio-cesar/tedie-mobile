// import { useContext, useEffect, useState } from "react"
// import { getMarkets } from "../services/market"

// export const useMarkets = () => {
//     const [state, setState] = useState([])
//     useEffect(() => {
//         getMarkets().then(response => {
//             const markets = response.data;
//             if (response.status == 200)
//                 setState(markets)
//         })
//     })

//     return { markets: state }
// }
export interface IFoodJSON {
    id:string,
    name:string,
    srcImg:string,
}

const food1={
    id:'food1',
    name:"xiao-long-bao",
    srcImg:"https://img.lovepik.com/element/40137/6502.png_1200.png",
}
const food2={
    id:'food2',
    name:"spring-roll",
    srcImg:"https://www.pngmart.com/files/16/Crispy-Spring-Rolls-Transparent-PNG.png",
}
const food3={
    id:'food3',
    name:"you-tiao",
    srcImg:"https://upload.shejihz.com/2020/02/1c4118a499c974cae9a401ef45fc3571.jpg",
}
const food4={
    id:'food4',
    name:"sang-ji",
    srcImg:"https://img.ixintu.com/download/jpg/201912/f08362049d9c449724efc5a3c55a3112.jpg!ys",
}
export const FoodJSONList = [food1,food2,food3,food4];
export default FoodJSONList;
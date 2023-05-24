// helper function
function randomInt(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomNums(n:number, min:number, max:number){

    const arr:number[] = [];
    // check if we got enough number
    do{
        for(let i = 0; i < (n-arr.length); i++){
            const random = randomInt(min, max);
            if(!arr.includes(random)){
                arr.push(random);
            }else{
                break;
            }
        }
    }while(arr.length < n);

    return arr;
}

export default randomNums;

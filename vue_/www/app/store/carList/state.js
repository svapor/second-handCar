export default {
    page: 1,
    pagesize: 5,
    sortby: "id",
    sortdirection: 1,
    results: [],    //存放请求回来的pagesize条数据
    count: 0,
    filters: [
        //
        {"k": "color", "v":[]},
        {"k": "environmental", "v":[]},
        {"k": "price", "v": [0,100]},
        {"k": "km", "v": [0,1000000]},
        {"k": "displacement", "v": []},
        {"k": "fuel", "v": []},
        {"k": "gearbox", "v": []},
        {"k": "brand", "v": []},
        {"k": "type", "v": []}
    ]
}
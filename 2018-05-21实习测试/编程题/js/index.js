import myMode from './myMode.js'
let index = (function () {
    let dataArray = [];//原始数据,二维数组，每个内数组对应排序中某一状态
    let showStyle = null;//展示方式
    let row_index = 0;//当前步数，初始化为0
    let z_index = 2000;//消息提示框高度
    let messageList = [{
        message: '演示数据输入有误，请查证',
        title: '×',
        bg_color: '#FF4949'
    }, {
        message: '演示数据过多，请适当删减',
        title: '×',
        bg_color: '#FF4949'
    }]


    function choice_sort(Data) {//选择排序，Data为二维数组，由外向内分别对应 row(步)，li（数据）

        let sortArr = [];
        for (let i = 0; i < Data[0].length; i++) {
            sortArr[i] = Data[0][i];//深复制原始数据
            Data[i + 1] = [];
        }


        for (let i = 0; i < sortArr.length; i++) {
            let tem = i;
            for (let j = i + 1; j < sortArr.length; j++) {
                if (sortArr[tem] > sortArr[j]) {
                    tem = j;
                }
            }
            let t = sortArr[i];//原始数据交换。
            sortArr[i] = sortArr[tem];
            sortArr[tem] = t;

            for (let z = 0; z < sortArr.length; z++) {
                Data[i + 1][z] = sortArr[z];
            }


        }

        Data.pop();//移除溢出项目
    }

    function up_sort(Data) {//冒泡排序
        let counter = 0;
        let sortArr = [];
        let len = Data[0].length
        for (let i = 0; i < len; i++) {
            sortArr[i] = Data[0][i];//深复制原始数据
        }


        for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
                if (sortArr[i] > sortArr[j]) {

                    let t = sortArr[j];//原始数据交换。
                    sortArr[j] = sortArr[i];
                    sortArr[i] = t;

                    Data[++counter] = [];//排序状态留影
                    for (let z = 0; z < len; z++) {
                        Data[counter][z] = sortArr[z];
                    }
                }
            }




        }

    }

    function insert_sort(Data) {//插入排序
        let sortArr = [];
        let counter = 0;
        let len = Data[0].length;
        let key = null;
        let i = null;
        for (let i = 0; i < len; i++) {
            sortArr[i] = Data[0][i];//深复制原始数据
        }

        for (let j = 1; j < len; j++) {

            key = sortArr[j];
            i = j - 1;
            while (i >= 0 && sortArr[i] > key) {
                sortArr[i + 1] = sortArr[i];
                i = i - 1;
            }
            sortArr[i + 1] = key;

            Data[++counter] = [];//排序状态留影
            for (let z = 0; z < len; z++) {
                Data[counter][z] = sortArr[z];
            }
        }
    }

    function merge_sort(Data) {//归并排序
        let sortArr = [];
        let counter = 0;
        let len = Data[0].length;

        for (let i = 0; i < len; i++) {
            sortArr[i] = Data[0][i];//深复制原始数据
        }

        merge_sort_up(0, len - 1);
        function merge_sort_up(q, r) {
            if (q < r) {
                var p = Math.floor((q + r) / 2);
                merge_sort_up(q, p);
                merge_sort_up(p + 1, r);
                merge_up(sortArr, q, p, r);

                Data[++counter] = [];//排序状态留影
                for (let z = 0; z < len; z++) {
                    Data[counter][z] = sortArr[z];
                }
                return sortArr;
            }
        }

        function merge_up(array, q, p, r) {//合并函数
            var array_1 = [];
            var array_2 = [];
            for (var i = 0; i < p - q + 1; i++) {
                array_1[i] = array[q + i];
            }
            array_1.push(Number.POSITIVE_INFINITY);
            for (i = 0; i < r - p; i++) {
                array_2[i] = array[p + i + 1]
            }
            array_2.push(Number.POSITIVE_INFINITY);
            i = 0;
            var j = 0;
            for (var c = q; c < r + 1; c++) {
                if (array_1[i] > array_2[j]) {
                    array[c] = array_2[j];
                    j++;
                } else {
                    array[c] = array_1[i];
                    i++;
                }
            }

            return array;
        }

    }

    function fast_sort(Data) {//快速排序

        let sortArr = [];
        let counter = 0;
        let len = Data[0].length;

        for (let i = 0; i < len; i++) {
            sortArr[i] = Data[0][i];//深复制原始数据
        }


        function diverd(arr, str, end) {
            let key = arr[end];
            let j = str - 1;
            let sum = null;
            for (let i = str; i < end; i++) {
                if (arr[i] <= key) {
                    j++;
                    sum = arr[j];
                    arr[j] = arr[i];
                    arr[i] = sum;

                }
            }

            sum = arr[j + 1];
            arr[j + 1] = arr[end];
            arr[end] = sum;


            return j + 1;


        }


        function work(arr, str, end) {

            if (str < end) {


                let p = diverd(arr, str, end);
                Data[++counter] = [];//排序状态留影
                for (let z = 0; z < len; z++) {
                    Data[counter][z] = arr[z];
                }
                work(arr, str, p - 1);
                work(arr, p + 1, end);


            }

        }

        work(sortArr, 0, len - 1);
    }

    function addDataNode(Data) {//展示node写入函数，Data为dataArray内某一数组，其内存排序某一时刻的状态，对应li（数据）
        document.getElementById('show_process').insertAdjacentHTML("beforeend", `<div class="row hidden"><ul>第${row_index}步：</ul></div>`);

        let nowNode = document.getElementsByClassName('row')[row_index];//获取当前row
        for (let i = 0; i < Data.length; i++) {


            nowNode.children[0].insertAdjacentHTML("beforeend", `<li style = "left:${i * 51}px">${Data[i]}</li>`);


        }


        setTimeout(() => {
            nowNode.classList = "row";//逐渐出现

        }, 100)

        row_index++;

    }


    function orderChange(index) {//order修改函数,index为对应步数。


        let nowNode = document.getElementsByClassName('row')[index].children[0];//获取当前row对应ul


        for (let i = 0; i < dataArray[0].length; i++) {
            if (dataArray[index][i] != dataArray[index - 1][i]) {
                nowNode.children[i].style.backgroundColor = '#72F9BE';
            }
        }

        setTimeout(() => {
            for (let i = 0; i < nowNode.children.length; i++) {
                nowNode.children[i].style.left = `${i * 51}px `;
                nowNode.children[i].innerHTML = dataArray[index][i];
            }
        }, 1000)

    }

    function start() {//开始按钮处理函数

        dataArray[0] = document.getElementsByName('data')[0].value.split(',');//dataArray[0]为原始数据。

        showStyle = document.getElementsByName('show_style')[0].value;

        for (let i = 0; i < dataArray[0].length; i++) {//循环遍历数组 

            dataArray[0][i] = parseInt(dataArray[0][i]);//number类型转换
            if (isNaN(dataArray[0][i])) {
                dataArray[0].splice(i, 1);//去除非number类型
                i--

            }


        }

        //判断输入数据个数，给出反馈
        if (dataArray[0].length == 0) {
            myMode.addNode(messageList[0], z_index);
            return;
        } else if (dataArray[0].length > 20) {
            myMode.addNode(messageList[1], z_index);
            return;
        }





        switch (showStyle) {
            case '1':
                choice_sort(dataArray);
                break;
            case '2':
                up_sort(dataArray);
                break;
            case '3':
                insert_sort(dataArray);
                break;
            case '4':
                merge_sort(dataArray);
                break;
            case '5':
                fast_sort(dataArray);
                break;

        }

        addDataNode(dataArray[row_index]);//原始数据写入DOM
        setTimeout(showSort, 2600);

        function showSort() {//每隔2.6s调用函数，展示排序步骤

            addDataNode(dataArray[row_index - 1]);
            setTimeout(() => {
                orderChange(row_index - 1)
            }, 100)

            if (row_index < dataArray.length) {
                setTimeout(showSort, 2600);
            }
        }

        document.getElementsByClassName("start")[0].style.display = 'none';//按钮切换
        document.getElementsByClassName("clear")[0].style.display = 'block';


    }

    function clear() {//下一步展示函数

        document.getElementsByClassName("start")[0].style.display = 'block';//按钮切换
        document.getElementsByClassName("clear")[0].style.display = 'none';

        let container = document.getElementById('show_process');
        while (container.firstChild) {//移除show_process 中的所有元素
            container.removeChild(container.firstChild);
        }

        row_index = 0;    //步数初始化
        dataArray = [[]];//展示数据初始化

    }
    return {
        start,
        clear
    }
})()

export default index;
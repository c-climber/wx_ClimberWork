
function onAccelerometerChange() {
  wx.onAccelerometerChange(function (res) {
    console.log(res.x)
    console.log(res.y)
    console.log(res.z)
    this.output(["", "", 'x:' + res.x, 'y:' + res.y, 'z:' + res.z], true);
  })
}

function showToast() {
  wx.showToast({
    title: '加载中',//String 提示的内容
    icon: 'loading',//图标，只支持"success"、"loading"
    duration: 1000,//提示的延迟时间，单位毫秒，默认：1500, 最大为10000
    success: function (e) {
      //接口调用成功的回调函数
    },
    fail: function (e) {
      //接口调用失败的回调函数
    },
    complete: function (e) {
      //接口调用结束的回调函数（调用成功、失败都会执行）
    }
  })
}

function showModal() {
  wx.showModal({
    title: '提示',//String 提示的标题
    content: '这是一个模态弹窗',//String	提示的内容
    showCancel: true,//是否显示取消按钮，默认为 true
    cancelText: '取消按钮',//String	取消按钮的文字，默认为"取消"
    cancelColor: '#E64340', //HexColor	取消按钮的文字颜色，默认为"#000000"
    confirmText: '确定按钮',//String	确定按钮的文字，默认为"确定"
    confirmColor: '#1AAD19',  //HexColor	确定按钮的文字颜色，默认为"#3CC51F"
    success: function (res) {
      //接口调用成功的回调函数，返回res.confirm==1时，表示用户点击确定按钮
      if (res.confirm) {
        console.log('用户点击确定')
      } else {
        console.log('用户点击取消')
      }
    },
    fail: function (e) {
      //接口调用失败的回调函数
    },
    complete: function (e) {
      //接口调用结束的回调函数（调用成功、失败都会执行）
    }
  })
}

function showActionSheet() {
  wx.showActionSheet({
    itemList: ['一', '二', '三', '四', '五', '六'],//String Array 按钮的文字数组，数组长度最大为6个
    itemColor: '#1AAD19',//HexColor	按钮的文字颜色，默认为"#000000"
    success: function (res) {
      if (!res.cancel) {
        console.log(res.tapIndex)
      }
    },
    fail: function (e) {
      //接口调用失败的回调函数
    },
    complete: function (e) {
      //接口调用结束的回调函数（调用成功、失败都会执行）
    }
  })
}

function demo() {

}

var Stack = function(){}
Stack.prototype={
    Init:function(){
        this.STACKMAX = 100;
        this.stack = new Array(this.STACKMACK);
        this.top = -1;
        return this.stack;
    },
    isEmpty:function(){
        if(this.top==-1){
            return true;
        }
        else{
            return false;
        }
    },
    push:function(elem){
        if(this.top==this.STACKMAX-1){
            return "栈满";
        }
        else{
            this.top++;
            this.stack[this.top] = elem;
        }
    },
    pop:function(){
        if(this.top==-1){
            return "空栈,无法删除栈顶元素！";
        }
        else{
            var x = this.stack[this.top];
            this.top--;
            return x;
        }
    },
    peek:function(){
        if(this.top!=-1){
            return this.stack[this.top];
        }
        else{
            return "空栈，顶元素无返回值！";
        }
    },
    Clear:function(){
        this.top=-1;
    },
    Length:function(){
        return this.top+1;
    }
}

function toRPolish(s){
	var list=new Array();
	var op=new Stack();
	op.Init();
	//var num=str.match(/\d+(\.\d+)?/g);
	var i=0;
	while(i<s.length){
		var c=s.charAt(i);
		if(c>='0'&&c<='9'){
			var s1=s.substr(i);
			var m=s1.match(/\d+(\.\d+)?/g);
			if (m.length>0){
				s1=m[0];
				list.push(s1);
			}
			i=i+s1.length;
			continue;
		}else if(c=='('){
			op.push(c);
		}else if(c==')'){
			var p=op.pop();
			while(p!='('){
				list.push(p);
				p=op.pop();
			}
		}else if(c=='+'||c=='-'){
			while(!op.isEmpty()&&(op.peek()=='+'||op.peek()=='-'||op.peek()=='×'||op.peek()=='÷')){
				list.push(op.pop());
			}
			op.push(c);
		}else if(c=='×'||c=='÷'){
			while(!op.isEmpty()&&(op.peek()=='×'||op.peek()=='÷')){
				list.push(op.pop());
			}
			op.push(c);
		}
		i++;
	}
	while(!op.isEmpty()){
		list.push(op.pop());
	}
	return list;
}

function g(a,b,c){
	var v=0;
	a=parseFloat(a);
	b=parseFloat(b);
	switch (c){
        case '+':
            v=floatAdd(a,b);
            break;
        case '-':
            v=floatSub(a,b);;
            break;
        case '×':
            v=floatMul(a,b);;
            break;
        case '÷':
            v=floatDiv(a,b);;
            break;
    }
    return v;
}

function getResult(list,result){
	for (var i=0;i<list.length;i++){
		if(!isNaN(list[i])){
			result.push(list[i]);
		}else{
			var b=result.pop();
			var a=result.pop();
			var v=g(a,b,list[i]);

			result.push(v);
		}
	}
	return result.pop();
}

function calculate(input){
    console.log(input);
    var list=toRPolish(input);
    console.log(list);
    var result=new Stack();
    result.Init();
    return getResult(list, result);
}

//金额大小写转换
function amuntCNV(money) {
  //汉字的数字
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  //基本单位
  var cnIntRadice = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  var cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  var cnInteger = '整';
  //整型完以后的单位
  var cnIntLast = '元';
  //最大处理的数字
  var maxNum = 999999999999999.9999;
  //金额整数部分
  var integerNum;
  //金额小数部分
  var decimalNum;
  //输出的中文金额字符串
  var chineseStr = '';
  //分离金额后用的数组，预定义
  var parts;
  if (money == '') { return ''; }
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length;
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;    
} 

//浮点数加法运算
function floatAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    return (arg1*m+arg2*m)/m;
}

//浮点数减法运算
function floatSub(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //动态控制精度长度
    n=(r1=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
}

//浮点数乘法运算
function floatMul(arg1,arg2){
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}


 //浮点数除法运算
function floatDiv(arg1,arg2){
    var t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length}catch(e){}
    try{t2=arg2.toString().split(".")[1].length}catch(e){}
    r1=Number(arg1.toString().replace(".",""));
    r2=Number(arg2.toString().replace(".",""));
    return (r1/r2)*Math.pow(10,t2-t1);
}

module.exports = {
  onAccelerometerChange: onAccelerometerChange,
  showToast: showToast,
  showModal: showModal,
  showActionSheet: showActionSheet,
  calculate:calculate,
  amuntCNV:amuntCNV
}

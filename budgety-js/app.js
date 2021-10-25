//var DataSetManagement=(function(){
//    var Data={
//        inc :[],
//        exp:[],
//        TIncomes:0,
//        TExpenses:0,
//        Budget:0,
//        TEPercentage:-1
//    }
//    var addDataItem=function(id,desc,val){
//        this.id=id;
//        this.desc=desc;
//        this.val=val;
//    }
//    return {
//        GetInput:function(){
//        var doms;
//        doms=document.querySelectorAll(this.VarForClass().Options+','+this.VarForClass().Description+','+this.VarForClass().Value); 
//        doms = this.ForEachNode(doms,this.ExtractValue);
//        return doms;
//    },
//        ForEachNode:function(node,fun)
//        {
//            var arr=[];
//           for(var i=0;i<node.length;i++)
//           {
//               arr.push(fun(node[i]));
//           }
//           return arr;
//        },
//        ExtractValue:function(ele)
//        {
//            return ele.value;
//        },
//        VarForClass:function(){
//        return{
//        Options:'.add__type',
//        Description:'.add__description',
//        Value:'.add__value',
//        AddBtn:'.add__btn',
//        BudgetValue:'.budget__value',
//        BudgetIncome:'.budget__income--value',
//        BudgetExpense:'.budget__expenses--value',
//        BudgetEPercentage:'.budget__expenses--percentage',
//        DeletingContainer:'.container',
//        BMonth:'.budget__title--month'
//        }
//        },
//        updateData:function(inp){
//            var Id;
//            //Creating and adding data item to Database
//            if(Data[inp[0]].length>0)
//            {Id = Data[inp[0]][Data[inp[0]].length-1].id+1;}
//            else 
//            {Id=0;}
//            Data[inp[0]].push(new addDataItem(Id,inp[1],inp[2]))
//           
//            //updating total count
//            if(inp[0]=='inc')
//            {
//                Data['TIncomes']+=parseFloat(inp[2]);
//            }
//            else if(inp[0]=='exp')
//            {
//                Data['TExpenses']+=parseFloat(inp[2]);
//            }
//            
//            //updating budget
//            Data['Budget']=Data['TIncomes']-Data['TExpenses'];
//            
//        },
//        GetData:function(){
//            return Data;
//        },
//        changeData:function(inp){
//            //Data[inp[0].slice(0,3)]
//            for(var i=0;i<Data[inp[0].slice(0,3)].length;i++)
//            {
//                if(Data[inp[0].slice(0,3)][i].id==inp[1])
//                {
//                    if(inp[0].slice(0,3)==='inc')
//                    {
//                        Data['TIncomes']-=parseFloat(Data[inp[0].slice(0,3)][i].val);
//                        
//                    }
//                    else
//                    {
//                        Data['TExpenses']-=parseFloat(Data[inp[0].slice(0,3)][i].val);
//                         
//                    }
//                    
//                    Data[inp[0].slice(0,3)].splice(i,1);
//                    break;
//                }
//                
//            }
//            Data['Budget']=Data['TIncomes']-Data['TExpenses'];
//        },
//       CPer:function(exp)
//       {
//           if(Data.TIncomes>0){
//               document.querySelector('#expense-'+exp.id).childNodes[1].childNodes[1].textContent=Math.round((exp.val/Data.TIncomes)*100)+'%';
//           }
//           else
//            {
//                document.querySelector('#expense-'+exp.id).childNodes[1].childNodes[1].textContent='--';
//            }
//           
//       }
//}
//})();
//
//var UIManagement =(function(){
//    var calcPer=function(inc,exp){
//        var per=(exp/inc)*100;
//        if(inc>0)
//        {return per;}
//        else{ return -1;}
//        
//    }
//    var formatNo=function(num,mode){
//        var sign=num>=0?'+':'-';
//        num=Math.abs(num);
//        num=num.toFixed(2);
//        console.log(sign+num);
//        if(mode=='exp')
//        sign='-';
//        return sign+num;
//    }
// return{
//       updateUI :function(inp){
//       var html;
//        //retrive database
//       var data= DataSetManagement.GetData();
//        //assign html string acc to type
//       if(inp[0]=='inc')
//       {
//           html='<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
//       }
//       else if(inp[0]=='exp')
//      {
//           html='<div class="item clearfix" id="expense-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%per%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
//      }
//        //replace placeholders with value
//       html=html.replace("%id%",data[inp[0]][data[inp[0]].length-1].id);
//       html=html.replace("%desc%",inp[1]);
//       
//       if(inp[0]=='exp')
//        {
//            var t=Math.round(calcPer(parseFloat(data['TIncomes']),parseFloat(inp[2])));
//            html=html.replace("%value%",formatNo(parseFloat(inp[2]),'exp'));
//            if(t===-1)
//            {
//                t='--';
//            }
//            html=html.replace('%per',t);
//            console.log(t===-1,t,html);
//        }
//        else
//        {html=html.replace("%value%",formatNo(parseFloat(inp[2])));}
//        //adding the html to DOM
//        if(inp[0]=='inc')
//        {
//            document.querySelector('.income__list').insertAdjacentHTML('beforeend',html);
//        }
//        else if(inp[0]=='exp')
//        {
//            document.querySelector('.expenses__list').insertAdjacentHTML('beforeend',html);
//        }
//       
//        //update Budget on UI
//        this.updateBUI(data);
//        
//        //update percentage on existing
//        DataSetManagement.ForEachNode(data['exp'],DataSetManagement.CPer);
//   }
//     ,
//        initUI:function(){
//        var mon=['january','february','march','april','May','June','July','August','September','Octomber','November','December'];
//        document.querySelector(DataSetManagement.VarForClass().BudgetValue).textContent=formatNo(0);
//        document.querySelector(DataSetManagement.VarForClass().BudgetIncome).textContent=formatNo(0);
//        document.querySelector(DataSetManagement.VarForClass().BudgetExpense).textContent=formatNo(0);
//        document.querySelector(DataSetManagement.VarForClass().BudgetEPercentage).textContent='--';
//        document.querySelector(DataSetManagement.VarForClass().BMonth).textContent=mon[new Date().getMonth()]+" "+new Date().getFullYear();
//    },
//       updateBUI:function(data){
//           var temp=Math.round(calcPer(data.TIncomes,data.TExpenses));
//           document.querySelector(DataSetManagement.VarForClass().BudgetValue).textContent=formatNo(data.Budget);
//        document.querySelector(DataSetManagement.VarForClass().BudgetIncome).textContent=formatNo(data.TIncomes);
//        document.querySelector(DataSetManagement.VarForClass().BudgetExpense).textContent=formatNo(data.TExpenses);
//        if(temp>0)
//        {document.querySelector(DataSetManagement.VarForClass().BudgetEPercentage).textContent=temp+'%';}
//        else
//        {
//            document.querySelector(DataSetManagement.VarForClass().BudgetEPercentage).textContent='--';
//        }
//       },
//        clearFields:function(){
//            document.querySelector(DataSetManagement.VarForClass().Description).value="";
//            document.querySelector(DataSetManagement.VarForClass().Value).value="";
//        }
//        };
//    
//})();
//
//var CentralController =(function(){
//     var addEL = function(){
//        document.querySelector(DataSetManagement.VarForClass().AddBtn).addEventListener('click',onC);
//        document.addEventListener('keypress',function(event){
//            if(event.keyCode===13||event.which===13)
//            {
//                onC();
//            }
//        });
//        document.querySelector(DataSetManagement.VarForClass().DeletingContainer).addEventListener('click',del);
//     }
//     var onC=function(){
//            var inp;
//            inp = DataSetManagement.GetInput();
//           if(inp[1]!==""&&inp[2]!==""){
//            DataSetManagement.updateData(inp);
//            UIManagement.updateUI(inp);
//            UIManagement.clearFields();
//           }
//     }
//     var del=function(event){
//         //delete from UI
//         var d=document.getElementById(event.target.parentNode.parentNode.parentNode.parentNode.id);
//         d.parentNode.removeChild(d);
//         
//         //changes in data
//         var Id=event.target.parentNode.parentNode.parentNode.parentNode.id;
//         Id=Id.split('-');
//         DataSetManagement.changeData(Id);
//         UIManagement.updateBUI(DataSetManagement.GetData());
//         
//         //update Budget on UI
//        UIManagement.updateBUI(DataSetManagement.GetData());
//        
//        //update percentage on existing
//        DataSetManagement.ForEachNode(DataSetManagement.GetData()['exp'],DataSetManagement.CPer);
//     }
//     addEL();
//     UIManagement.initUI();
//    
//})();

//again implementing app
//data controller
var BudgetController=(function(){
    
    //Creating Expense function constructor
    var Expenses=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
        this.percentage=-1;
    }
    Expenses.prototype.calcPercentage=function(totalInc){
        this.percentage=totalInc>0?Math.round((this.value/totalInc)*100):-1;
    }
    Expenses.prototype.getPercentage=function(){
        return this.percentage;
    }
    //Creating Income function constructor
    var Incomes=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    }
    
    //creating a DS for all the data
    var data={
        allItems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        },
        budget:0,
        percentage:-1
    }
    
    return {
        addItem:function(type,desc,val){
            
            var id,item;
            
            //calculate id
            if(data.allItems[type].length===0)
                id=0;
            else
                id=data.allItems[type][data.allItems[type].length-1].id+1;
            
            //create a new item
            if(type==='inc')
                item=new Incomes(id,desc,val);
            else
                item=new Expenses(id,desc,val);
            
            //add new item to the data structure
            data.allItems[type].push(item);
            
            //return the added item
            return item;
        },
        updateTotals:function(type){
            var sum=0;
            //calculate the sum
            data.allItems[type].forEach(function(cur){
                sum+=cur.value;
            });
            //update the totals
            data.totals[type]=sum;
        },
        calculateBudget:function(){
            
            //update the datastructure
            this.updateTotals('inc');
            this.updateTotals('exp');
            
            //calculate and set the budget value
            data.budget=data.totals.inc-data.totals.exp;
            
            //calculate and set the percentage value
            data.percentage=data.totals.inc>0?(data.totals.exp/data.totals.inc)*100:-1;
        },
        calculatePercentages:function()
        {
            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.totals.inc);
            })
        }
        ,
        getBudget:function(){
            return {
                totals:data.totals,
                budget:data.budget,
                percentage:data.percentage
            }
        },
        getPercentages:function(){
            return data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            })
        },
        deleteItem:function(type,id){
            
            //find the element with id in specific type array and delete
            data.allItems[type].forEach(function(cur,index){
                if(cur.id===id)
                {
                    //deleting the element
                    data.allItems[type].splice(index,1);
                    return;
                }
            });
        },
        showData:function(){
            console.log(data);
        }
    }
})();

//UI controller
var UIController=(function(){
    var DOMStrings={
        typeInp:'.add__type',
        descInp:'.add__description',
        valInp:'.add__value',
        addBtn:'.add__btn',
        expContainer:'.expenses__list',
        incContainer:'.income__list',
        budgetDisplay:'.budget__value',
        incomeDisplay:'.budget__income--value',
        expenseDisplay:'.budget__expenses--value',
        percentageDisplay:'.budget__expenses--percentage',
        container:'.container',
        percentageContainer:'.item__percentage',
        monthDisp:'.budget__title--month',
    }
    var formatNumber=function(no,type){
        var notemp;
        no=Math.abs(no);
        no=no.toFixed(2);
        //splitting no in int and dec
        notemp=no.toString().split('.');
        
        //adding , if no is greater than 1000
        notemp[0]=notemp[0].length>3?notemp[0].substr(0,notemp[0].length-3)+','+notemp[0].substr(notemp[0].length-3,3):notemp[0];
        
        //add + or -
        notemp[0]=type=='inc'?'+ '+notemp[0]:'- '+notemp[0];
        
        return notemp[0]+'.'+notemp[1];
    }
    
    //creating a forEach functionality for node list
    var nodeListForEach=function(fields,callback){
        for(var i=0;i<fields.length;i++)
        {
             callback(fields[i],i);
        }
    }
            
    return {
        getInput:function(){
            return{
                type:document.querySelector(DOMStrings.typeInp).value,
                description:document.querySelector(DOMStrings.descInp).value,
                value:parseFloat(document.querySelector(DOMStrings.valInp).value)
            }
        },
        getDOMStrings:function(){
            return DOMStrings;
        },
        addItemToUI:function(item,type){
            var html,element;
            
            if(type==='inc')
            {
                element=DOMStrings.incContainer;
                html='<div class="item clearfix" id="inc-'+item.id+'"><div class="item__description">'+item.description+'</div><div class="right clearfix"> <div class="item__value">'+formatNumber(item.value,'inc')+'</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div></div>';
            }
            else
            {
                element=DOMStrings.expContainer;
                html='<div class="item clearfix" id="exp-'+item.id+'"><div class="item__description">'+item.description+'</div><div class="right clearfix"><div class="item__value">'+formatNumber(item.value,'exp')+'</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            document.querySelector(element).insertAdjacentHTML('beforeend',html);            
        },
        clearInput:function(){
            var fields;
            //getting list of elements
            fields=document.querySelectorAll(DOMStrings.descInp+','+DOMStrings.valInp);
            //converting list to array
            fields=Array.prototype.slice.call(fields);
            //iterating through fields array to clear input values
            fields.forEach(function(field,index,array){
                field.value='';
            })
            //set the focus back to description box
            fields[0].focus();
        },
        updateBudget:function(budget){
            
            var type=parseInt(budget.budget)>=0?'inc':'exp';
            //update the UI based on values recived in budget object
            document.querySelector(DOMStrings.budgetDisplay).textContent=formatNumber(budget.budget,type);
            document.querySelector(DOMStrings.incomeDisplay).textContent=formatNumber(budget.totals.inc,'inc');
            document.querySelector(DOMStrings.expenseDisplay).textContent=formatNumber(budget.totals.exp,'exp');
            document.querySelector(DOMStrings.percentageDisplay).textContent=budget.percentage>0?'%'+Math.round(budget.percentage):'---';
        },
        deleteItemFromUI:function(id){
            //get the element from param id
            var ele=document.getElementById(id);
            
            //delete the element
            ele.parentNode.removeChild(ele);
        },
        updatePercentages:function(per){
            //select all elements of type expense
            var eles=document.querySelectorAll(DOMStrings.percentageContainer);
            
            //iterating through elements to update percentages
            nodeListForEach(eles,function(cur,idx){
                cur.textContent=per[idx]>0?'%'+per[idx]:'---';
            })
        },
        displayDate:function(){
            var date=new Date();
            var months=['January','February','March','April','May','June','July','September','October','November','December'];
            document.querySelector(DOMStrings.monthDisp).textContent=months[date.getMonth()]+' '+date.getFullYear();
        },
        toggleClasses:function(){
            nodeListForEach(document.querySelectorAll(DOMStrings.typeInp+','+DOMStrings.descInp+','+DOMStrings.valInp),function(cur){
                cur.classList.toggle('red-focus');
            });
            document.querySelector(DOMStrings.addBtn).classList.toggle('red');
        }
    }
})();

//main controller
var controller=(function(budgetCtrl,UICtrl){
    
    var setUpEventListeners=function(){
        DOMStr=UICtrl.getDOMStrings();
        //Getting the input when enter or button is clicked
        document.addEventListener('keypress',function(event){
            if(event.keyCode===13||event.which===13)
            {
                addItemCtrl();
            }
        });
        document.querySelector(DOMStr.addBtn).addEventListener('click',addItemCtrl);
        
        document.querySelector(DOMStr.container).addEventListener('click',deleteItemCtrl);
        
        document.querySelector(DOMStr.typeInp).addEventListener('change',UICtrl.toggleClasses);
        //document.querySelectorAll(DOMStr.typeInp+','+DOMStr.descInp+','+DOMStr.valInp)
    }
    
    var updateBudget=function(){
        
        //calculate the budget
        budgetCtrl.calculateBudget();
        console.log(budgetCtrl.getBudget());
        
        //update the UI
        UICtrl.updateBudget(budgetCtrl.getBudget());
    }
    
    var updatePercentages=function(){
        
        //calculate percentages
        budgetCtrl.calculatePercentages();
        
        //update it on UI
        UICtrl.updatePercentages(budgetCtrl.getPercentages());
    }
    
    //Function that help us to remove an item
    var deleteItemCtrl=function(event){
        var id,splitedID;
        //fetching id from event
        id=event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if(id)
        {
            //splitting id into type and id
            splitedID=id.split('-');
            console.log(splitedID);
            
            //delete from datastructure
            budgetCtrl.deleteItem(splitedID[0],parseInt(splitedID[1]));
            
            //delete from UI
            UICtrl.deleteItemFromUI(id);
            
            //update the budget
            updateBudget();
            
            //calculate and update percentages
            updatePercentages();
        }
    }
    
    //Function that help us to add a new item
    var addItemCtrl=function(){
        
        //getting the input from the GUI components
        var inputData=UICtrl.getInput();
        
        if(inputData.description!==''&&!isNaN(inputData.value)&&inputData.value>0)
        {
        //update the data structure
        var item=budgetCtrl.addItem(inputData.type,inputData.description,inputData.value);
        
        //update the GUI
        UICtrl.addItemToUI(item,inputData.type);
        
        //clear the input fields
        UICtrl.clearInput();
        
        //update the budget and show it on ui
        updateBudget();
            
        //calculate and update percentages
        updatePercentages();
            
        }
    }
    
    return{
        init:function(){
            console.log("Application has started running....");
            UICtrl.updateBudget(budgetCtrl.getBudget());
            UICtrl.displayDate();
            setUpEventListeners();
        }
    }
    
})(BudgetController,UIController);

//calling initializer
controller.init()
#define API document
Search 
--
    search(Name,error count,date,component,displaycount)
    {  
        return json{
            "name": "ricky",
             "error_count": "t1",
            "date":"2014/04/21",
            "component": "",
            "display_count":""
         }
    }
display 
--
    display(json) {
        structure of json{
            "name": "ricky",
            "error_count": "t1",
            "date":"2014/04/21",
            "component": "",
            "display_count":""
        }
    }
chartFormat 
---
    chartFormat(dateRange,errorCountSet) {
        return json{
            date{
                2014/04/15
                2014/04/16
            }
            erroCount{
                1
                2
            }
        }
    }
CreatChart 
--
    createChart(json, target )
        structure of json{
            date{
                2014/04/15
                2014/04/16
            }
            errorCount{
                1
                2
            }
        }   
    }
CreateTable
--
    createTab(target) {
        target is an DOM (template)
        return tab
    }

declare interface AvaliableGraphs{
    graph1:boolean;
    graph2:boolean;
    table1:boolean
    table2:boolean;
}

export class GraphsPrefrences{
    
    avaliableGraphs: AvaliableGraphs= {
        graph1: false,
        graph2: false,
        table1: false,
        table2: false
    }
}
import { Injectable } from '@angular/core';
import { AsyncApiCall } from './async-api-call';
import { StatusCodes } from '../dataset/dataset';

interface Result {
  name:string;
  id:string;
}

@Injectable()
export class AutoComplete {
  public newAdd:boolean = false;
  constructor() { }

  public result: Result[] = [];
  public listName: string;
  public listValue: string;
  public list: string[] = [];
  public idList: any[] = [];
  public fullList: any;
  get_full_list(param: string, name: string, value: string, filterBy: any = null) {
    this.refresh();
    this.listName = name;
    this.listValue = value;
    AsyncApiCall.view(param, {
      LIMIT: 1000,
      FIELDS: [this.listName, this.listValue, 'status'],
      ORDER: [],
      FILTER: filterBy
    }).subscribe(resp => {
      if (resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
        this.fullList = resp.data;

        for (let i = 0; i < resp['data'].length; i++) {
          let temp = resp['data'][i];
          if (resp.data[i].status === '1') {
            this.result.push({ "name": temp[this.listName], "id": temp[this.listValue] });
          }
        }
      } else {
        console.log("Autocomplete api failed");
      }


    });
  }

  searchList(event) {
    let query = event.query;
    this.list = [];
    this.idList = [];
    var text = this.filterAutoComplete(query, this.result);
    for (var i = 0; i < text.length; i++) {
      if (text[i]['id'] === 'new')
        this.list.push("+ " + text[i].name);
      else
        this.list.push(i + 1 + ". " + text[i].name);
      this.idList.push(text[i].id);
    }

  }

  getsearchListId(searchQuery: string) {
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i] === searchQuery) {
        return this.idList[i];
      }
    }
    return false;
  }

  filterAutoComplete(query, fullList: any[]): any[] {
    let filtered: any[] = [];

    for (let i = 0; i < fullList.length; i++) {
      if (fullList[i].name.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(fullList[i]);
      }
    }
    if (this.newAdd)
      filtered.push({
        name: 'Add New',
        id: 'new'
      });
    return filtered;
  }

  getNameById(id, key, value) {
    for (let i = 0; i < this.fullList.length; i++) {
      if (this.fullList[i][key] === id) {
        let data = this.fullList[i];
        data[value] = this.fullList[i][value];
        return data;
      }
    }

  }


  refresh() {

  }
}
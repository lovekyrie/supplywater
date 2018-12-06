import SqlCompareMode from './SqlCompareMode.js'
class Query {
  constructor(){
    this.queryClause = {
      w: [],
      o: []
    }
  }
  getParam(){
    let param = {
      query:this.toString()
    }
    return param;
  }
  buildWhereClause(fieldName, targetValue, mode){
    if(typeof mode == "undefined") {
      //mode = Query.LK;
      //mode = 'LK';
      mode = SqlCompareMode.LK;
    }
    this.queryClause.w.push ({
      'k': $.trim(fieldName),
      'v': $.trim(targetValue),
      'm': mode
    });
    return this;
  }

  buildOrderClause(sortByKey, sortByType) {
    this.queryClause.o.push ({
      'k': $.trim(sortByKey),
      't': sortByType
    });
    return this;
  }

  buildPageClause(pageNum, pageSize) {
    this.queryClause.p = {
      'n': pageNum,
      's': pageSize
    };
    return this;
  }

  buildOrderClause(sortByKey, sortByType) {
    this.queryClause.o.push ({
      'k': sortByKey,
      't': sortByType
    });
    return this;
  }

  toString() {
    return JSON.stringify(this.queryClause)
  }

}
export { Query };
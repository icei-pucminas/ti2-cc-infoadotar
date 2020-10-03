class DAL {

    //<summary>
    //Creates a new table
    //</summary>
    //<param name="table">the table name</param>
    static setTable(table, error) {
        if (typeof table == 'string')
            localStorage.setItem(table, "[]");
        else
            error("\"table\" não é do tipo string");
    }

    //<summary>
    //Creates a new ID for a new item
    //</summary>
    //<param name="tableData">the data from an table</param>
    //<returns>the new ID</returns>
    static getId(tableData, callback) {
        if (typeof callback == 'function') {
            if (tableData.length > 0) {
                let newId = Math.max(...tableData.map(function (val) {
                    return val.id;
                })) + 1;
                callback(newId);
            }
            else callback(1);
        }
    }

    //<summary>
    //Creates a new ID for a new data object
    //</summary>
    //<param name="tableData">the data from an table</param>
    //<param name="data">an data object</param>
    //<returns>the new ID</returns>
    static setId(tableData, data, callback) {
        if (typeof callback == 'function') {
            this.getId(tableData, function (newId) {
                let result = data;
                result.id = newId;
                callback(result);
            });
        }
    }

    //<summary>
    //Create an data object inside the selected table
    //</summary>
    //<param name="table">the selected table</param>
    //<param name="data">an data object</param>
    static create(table, data, success, error) {
        if (typeof success == 'function' && typeof error == 'function') {
            if (typeof table == 'string' && typeof data == 'object') {

                let tableData = JSON.parse(localStorage.getItem(table));

                this.setId(tableData, data, function (newData) {
                    tableData.push(newData);
                    localStorage.setItem(table, JSON.stringify(tableData));

                    success(newData);
                });
            }
            else error("\"table\" não é do tipo string ou \"data\" não é um objeto");
        }

    }

    //<summary>
    //update an data object from the selected table
    //</summary>
    //<param name="table">the selected table</param>
    //<param name="data">an data object</param>
    static update(table, data, success, error) {
        if (typeof success == 'function' && typeof error == 'function') {
            if (typeof table == 'string' && typeof data == 'object' && data.id && typeof data.id == 'number') {
                let tableData = JSON.parse(localStorage.getItem(table));
                let index = tableData.findIndex(function (item) { return item.id == data.id });
                if (typeof index == 'number'? index >= 0 : false) {
                    Object.keys(data).forEach(function (name) {
                        tableData[index][name] = data[name];
                    });
                    localStorage.setItem(table, JSON.stringify(tableData));
                    success(tableData[index]);
                } else error(`Item com id ${data.id} não foi encontrado em ${table}`);
            } else error("\"table\" não é do tipo string ou \"data\" não é um objeto ou não contem id");
        }
    }

    //<summary>
    //read a data object with the selected id from the selected table
    //</summary>
    //<param name="table">the selected table</param>
    //<param name="id">the selected id</param>
    //<returns>an data object</returns>
    static read(table, id, success, error) {
        if (typeof success == 'function' && typeof error == 'function') {
            if (typeof table == 'string' && typeof id == 'number') {
                let tableData = JSON.parse(localStorage.getItem(table));
                success(tableData.find(function (item) { return item.id == id }));
            } else error("\"table\" não é do tipo string ou \"id\" não é do tipo number");
        }
    }

    //<summary>
    //returns all data objects from the selected table
    //</summary>
    //<param name="table">the selected table</param>
    //<returns>an data array</returns>
    static readAll(table, success, error) {
        if (typeof success == 'function' && typeof error == 'function') {
            if (typeof table == 'string') {
                success(JSON.parse(localStorage.getItem(table)));
            } else error("\"table\" não é do tipo string");
        }
    }

    //<summary>
    //returns all data objects from the selected table that match the func condition
    //</summary>
    //<param name="table">the selected table</param>
    //<param name="func">a boolean function</param>
    //<returns>an data array</returns>
    static filter(table, func, success, error) {
        if (typeof success == 'function' && typeof error == 'function') {
            if (typeof table == 'string' && typeof func == 'function') {
                let tableData = JSON.parse(localStorage.getItem(table));
                success(tableData.filter(func));
            } else error("\"table\" não é do tipo string ou \"func\" não é uma função");
        }
    }

    //<summary>
    //Removes a data object from the selected table
    //</summary>
    //<param name="table">the selected table</param>
    //<param name="id">the data object id</param>
    static delete(table, id, success, error) {
        if (typeof success == 'function' && typeof error == 'function') {
            if (typeof table == 'string' && typeof id == 'number') {
                let tableData = JSON.parse(localStorage.getItem(table));
                let index = tableData.findIndex(function (item) { return item.id == id });
                if (typeof index == 'number'? index >= 0 : false) {
                    tableData.splice(index, 1)
                    localStorage.setItem(table, JSON.stringify(tableData));
                    success();
                } else error(`Item com id ${id} não foi encontrado em ${table}`);
            } else error("\"table\" não é do tipo string ou \"id\" não é do tipo number");
        }
    }
}
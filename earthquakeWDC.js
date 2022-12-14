(function () {
    var myConnector = tableau.makeConnector();
    myConnector.getSchema = function (schemaCallback) {
        var cols = [
            {id: "id", dataType: tableau.dataTypeEnum.string},
            {id: "BIRTH_YEAR", dataType: tableau.dataTypeEnum.string}, 
            {id: "GENDER", dataType: tableau.dataTypeEnum.string},
            {id: "ETHNICITY", dataType: tableau.dataTypeEnum.string},
            {id: "NAME", dataType: tableau.dataTypeEnum.string}, 
            {id: "COUNT", dataType: tableau.dataTypeEnum.int}, 
            {id: "RANK", dataType: tableau.dataTypeEnum.int}
        ];
        var tableSchema = {
            id: "IncrementalRefresh",
            alias: "MaintTable",
            columns: cols,
            incrementalColumnId: "id"
        };
        schemaCallback([tableSchema]);
    };
    myConnector.getData = function (table, doneCallback) {
        $.getJSON("https://data.cityofnewyork.us/api/views/25th-nujf/rows.json", function(resp) {
        var lastId = parseInt(table.incrementValue || -1);
        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "id": feat[i][0],
                "BIRTH_YEAR": feat[i][8],
                "GENDER": feat[i][9],
                "ETHNICITY": feat[i][10],
                "NAME": feat[i][11],
                "COUNT": feat[i][12],
                "RANK": feat[i][13]
            });
        }
        table.appendRows(tableData);
        doneCallback();
    });
    };
    tableau.registerConnector(myConnector);
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Test ";
            tableau.submit();
        });
    });
})();
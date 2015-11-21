/**
 * Data models
 */
Apperyio.Entity = new Apperyio.EntityFactory({
    "Number": {
        "type": "number"
    },
    "Stuff": {
        "type": "object",
        "properties": {
            "text": {
                "type": "string"
            },
            "_id": {
                "type": "string"
            }
        }
    },
    "Boolean": {
        "type": "boolean"
    },
    "StuffList": {
        "type": "array",
        "items": {
            "type": "Stuff"
        }
    },
    "String": {
        "type": "string"
    },
    "User": {
        "type": "object",
        "properties": {
            "id": {
                "type": "string"
            },
            "sessionToken": {
                "type": "string"
            },
            "name": {
                "type": "string"
            }
        }
    }
});
Apperyio.getModel = Apperyio.Entity.get.bind(Apperyio.Entity);

/**
 * Data storage
 */
Apperyio.storage = {

    "currentUser": new $a.LocalStorage("currentUser", "User"),

    "stuffList": new $a.LocalStorage("stuffList", "StuffList"),

    "selectedItem": new $a.LocalStorage("selectedItem", "Stuff")
};
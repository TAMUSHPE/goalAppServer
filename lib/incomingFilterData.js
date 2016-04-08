/**
 * retrieveFields goes through elementFields and checks if
 * element has that field if it does assigns it to newElement
 * @param  {[array of string]} elementFields [fields that belong to object]
 * @param  {[type]} newElement [doc modeyl]
 * @param  {[type]} element    [object that contains the keys in elementFields]
 * @return {[type]}            [none]
 */
function retrieveFields (elementFields, newElement, element) {
	if (element == null) {return;}
	//import top level fields for element
	for (var i = 0; i < elementFields.length; i++) {
		if(typeof element[elementFields[i]] !== 'undefined')
		{
			if (elementFields[i] === "created_on" ||
				elementFields[i] === "last_modified") {
				newElement[elementFields[i]] = new Date(element[elementFields[i]]);
			}
			else
				newElement[elementFields[i]] = element[elementFields[i]];
		}
	}
}
/**
 * filter check if all keys in object are legal fields
 * @param  {[type]} elementFields    [array of fields that belong to object]
 * @param  {[type]} elementValues    [Object  that contains members of
								      Key value pairs with key being changed and new value
								      { center: 10,10
								      } ]
 * @return {[Object]} filteredObject [object that has values already fitlered]
 */
function filter(elementFields,elementValues){
	var keys = Object.keys(elementValues);
	var filterEdits = keys.filter(function(value,i){
		if (elementFields.indexOf(value) > -1) return value;
	});
	var filteredObject = {};
	for (var i = 0; i < filterEdits.length; i++) {
		filteredObject[filterEdits[i]] = elementValues[filterEdits[i]];
	};
	return filteredObject;
}
function mongooseIdReal(Id){
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return ({error: 404,message: "id doesnt exist"})
	};
	return null;
}
module.exports = {
	retrieveFields: retrieveFields,
	filter: filter,
        mongooseIdIsReal: mongooseIdReal
};

var package = require('../package'),
    configurations = require('./configurations'),
    requestManager = require('./request-manager'),
    paymentModule = require('./resources/payment'),
    preapprovalModule = require('./resources/preapproval'),
    preferencesModule = require('./resources/prefereces'),
    ipnModule = require('./resources/ipn');

module.exports = function(){

    //This is going to be a support for v0 API for refund and cancel a payment
    var collectionMethod = requestManager.describe({
        path: '/v1/collections/:id',
        method: 'PUT'
    });

    /**
     * Show Warning for method deprecation
     */
    function showWarning(){
        var method = arguments.callee.caller.name;
        if( !configurations.areTestsRunnning() ) console.warn('This method (' + method + ') is deprecated and its going to be remove on next versions');
    };

    /**
     * Enabled or disabled sandbox
     * @param enabled
     */
    function sandboxMode(enabled){
        showWarning();
        configurations.sandbox = ( enabled !== undefined ) ? (enabled === true) : configurations.sandbox;
    };

    /**
     * Get access_token using the client_id and client_secret configure
     * @param callback
     * @returns {string}
     */
    function getAccessToken(callback){
        showWarning();
        return requestManager.generateAccessToken(callback);
    };

    /**
     * Execute a GET operation (Used like a rest client)
     * @param uri
     * @returns {Thenable<U>|*|{anyOf}}
     */
    function get(uri){
        showWarning();

        var callback = ( arguments[arguments.length - 1] !== undefined && typeof arguments[arguments.length - 1] == 'function' ) ? arguments[arguments.length - 1] : function(){};

        var options = {
            path: uri,
            method: 'GET',
            config: {
                qs: (arguments[1] !== undefined && typeof arguments[1] !== 'function') ? arguments[1] : {}
            }
        };

        return requestManager.generateAccessToken(function(err){
            //Return callback if an error ocurr getting the access_token
            if(err) return callback.apply(null, [err, null]);
        }).then(function(){
            return requestManager.exec(options, callback);
        });
    };

    /**
     * Execute a POST operation (Used like a rest client)
     * @param uri
     * @returns {Thenable<U>|*|{anyOf}}
     */
    function post(uri){
        showWarning();

        var callback = ( arguments[arguments.length - 1] !== undefined && typeof arguments[arguments.length - 1] == 'function' ) ? arguments[arguments.length - 1] : function(){};

        var options = {
            path: uri,
            method: 'POST',
            payload: (arguments[1] !== undefined && typeof arguments[1] !== 'function') ? arguments[1] : {},
            config: {
                qs: (arguments[2] !== undefined && typeof arguments[2] !== 'function') ? arguments[2] : {}
            }
        };

        return requestManager.generateAccessToken(function(err){
            //Return callback if an error ocurr getting the access_token
            if(err) return callback.apply(null, [err, null]);
        }).then(function(){
            return requestManager.exec(options, callback);
        });
    };

    /**
     * Execute a PUT operation (Used like a rest client)
     * @param uri
     * @returns {Thenable<U>|*|{anyOf}}
     */
    function put(uri){
        showWarning();

        var callback = ( arguments[arguments.length - 1] !== undefined && typeof arguments[arguments.length - 1] == 'function' ) ? arguments[arguments.length - 1] : function(){};

        var options = {
            path: uri,
            method: 'PUT',
            payload: (arguments[1] !== undefined && typeof arguments[1] !== 'function') ? arguments[1] : {},
            config: {
                qs: (arguments[2] !== undefined && typeof arguments[2] !== 'function') ? arguments[2] : {}
            }
        };

        return requestManager.generateAccessToken(function(err){
            //Return callback if an error ocurr getting the access_token
            if(err) return callback.apply(null, [err, null]);
        }).then(function(){
            return requestManager.exec(options, callback);
        });
    };

    /**
     * Execute a DELETE operation (Used like a rest client)
     * @param uri
     * @returns {Thenable<U>|*|{anyOf}}
     * @private
     */
    function _delete(uri){
        showWarning();

        var callback = ( arguments[arguments.length - 1] !== undefined && typeof arguments[arguments.length - 1] == 'function' ) ? arguments[arguments.length - 1] : function(){};

        var options = {
            path: uri,
            method: 'DELETE',
            config: {
                qs: (arguments[1] !== undefined && typeof arguments[1] !== 'function') ? arguments[1] : {}
            }
        };

        return requestManager.generateAccessToken(function(err){
            //Return callback if an error ocurr getting the access_token
            if(err) return callback.apply(null, [err, null]);
        }).then(function(){
            return requestManager.exec(options, callback);
        });
    };

    /**
     * Create a preference using preferenceModule
     * @param preferences
     * @param callback
     * @returns {preferences}
     */
    function createPreference(preferences, callback){
        showWarning();
        return preferencesModule.create(preferences, callback);
    };

    /**
     * Update a preference using the preferenceModule (Make sure that the id is on the payload)
     * @param id
     * @param preference
     * @param callback
     * @returns {*}
     */
    function updatePreference(id, preference, callback){
        showWarning();

        //Add the id to the preferece object
        preference['id'] = id;

        return preferencesModule.update(preference, callback);
    };

    /**
     * Get a preference using preferenceModule
     * @param id
     * @param callback
     * @returns {*}
     */
    function getPreference(id, callback){
        showWarning();
        return preferencesModule.get(id, callback);
    };

    /**
     * Create a preapproval payment using the preapprovalModule
     * @param preapproval
     * @param callback
     * @returns {preapproval}
     */
    function createPreapprovalPayment(preapproval, callback){
        showWarning();
        return preapprovalModule.create(preapproval, callback);
    };

    /**
     * Update a preapproval payment using the preapprovalModule (Make sure that the id is on the payload)
     * @param id
     * @param preapproval
     * @param callback
     * @returns {*}
     */
    function updatePreapprovalPayment(id, preapproval, callback){
        showWarning();

        //Add the id to the preapproval object
        preapproval['id'] = id;

        return preapprovalModule.update(preapproval, callback);
    };

    /**
     * Get a preapproval payment using the preapprovalModule
     * @param id
     * @param callback
     * @returns {*}
     */
    function getPreapprovalPayment(id, callback){
        showWarning();
        return preapprovalModule.get(id, callback);
    };

    /**
     * Search for a payment using specific filters (offset and limit). Use the paymentModule
     * @param filters
     * @param offset
     * @param limit
     */
    function searchPayment(filters, offset, limit){
        showWarning();

        if( !isNaN(offset) ) filters.offset = offset;
        if( !isNaN(limit) ) filters.limit = limit;

        paymentModule.search({
            qs: filters
        });
    };

    /**
     * Get a payment using the IPN Module (Before manage method exists on IPN Module)
     * @param id
     * @param callback
     * @returns {*}
     */
    function getPayment(id, callback){
        showWarning();

        return ipnModule.getPayment(id, callback);
    };

    /**
     * Get a authorized payment using the IPN Module (Before manage method exists on IPN Module)
     * @param id
     * @param callback
     * @returns {*}
     */
    function getAuthorizedPayment(id, callback){
        showWarning();

        return ipnModule.getAuthorizedPayment(id, callback);
    };

    /**
     * Refund a payment (v0 implementation)
     * @param id
     * @param callback
     * @returns {*}
     */
    function refundPayment(id, callback){
        showWarning();

        return collectionMethod({
            id: id,
            status: "refunded"
        }, callback);
    };

    /**
     * Cancel a payment (v0 implementation)
     * @param id
     * @param callback
     * @returns {*}
     */
    function cancelPayment(id, callback){
        showWarning();

        return collectionMethod({
            id: id,
            status: "cancelled"
        }, callback);
    };

    /**
     * Canacel a preapproval payment using the preapprovalModule
     * @param id
     * @param callback
     * @returns {*}
     */
    function cancelPreapprovalPayment(id, callback){
        showWarning();

        return preapprovalModule.update({
            id: id,
            status: "cancelled"
        }, callback);
    };

    return {
        sandboxMode: sandboxMode,
        getAccessToken: getAccessToken,
        get: get,
        post: post,
        put: put,
        delete: _delete,
        createPreference: createPreference,
        updatePreference: updatePreference,
        getPreference: getPreference,
        createPreapprovalPayment: createPreapprovalPayment,
        updatePreapprovalPayment: updatePreapprovalPayment,
        getPreapprovalPayment: getPreapprovalPayment,
        searchPayment: searchPayment,
        getPayment: getPayment,
        getPaymentInfo: getPayment,
        getAuthorizedPayment: getAuthorizedPayment,
        refundPayment: refundPayment,
        cancelPayment: cancelPayment,
        cancelPreapprovalPayment: cancelPreapprovalPayment,
        version: package.version
    };
};
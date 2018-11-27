var Notes  = require('../models/notes');
var express = require('express');
var app =  express();
module.exports = function timestamp(schema) {
    // Add the two fields to the schema
    schema.add({
        createdAt: Date,
        updatedAt: Date
    })

    schema.pre('save', function (next) {
        let now = Date.now()
        this.updatedAt = now
        if (!this.createdAt) {
            this.createdAt = now
        }
        next()
    });

    schema.post('save', function (next) {
            next()
     });
}
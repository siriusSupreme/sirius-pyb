'use strict'

const path=require('path');
const fs=require('fs');
const glob=require('glob');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');

const files=glob.sync('./src/pages/*/*.js');

function getEntries() {
    let entries={};

    files.forEach(function (file,index) {
        const page=path.basename(path.dirname(file));
        entries[page]=file;
    });

    return entries;
}

function generateHtmlWebpackPlugin() {

}


module.exports={
    getEntries,generateHtmlWebpackPlugin
}
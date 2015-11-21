/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.cordova.tusk;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import android.content.res.AssetManager;
import android.database.Cursor;
import android.os.Bundle;

import org.apache.cordova.*;

import common.MyDatabase;

public class Tusk extends CordovaActivity 
{
	
	//https://github.com/OfficeDev/Property-Inspection-Code-Sample/blob/master/CordovaRepairApp/CordovaRepairApp/plugins/de.appplant.cordova.plugin.email-composer/src/android/EmailComposer.java
	
	public CordovaInterface cordova;
	String outputDBFile = "C:\\MyApps\\MobileApps\\Eclipse\\Tusk\\www\\tusk.db";
	private Cursor users;
	//private MyDatabase db;
	
	@Override
    public void onCreate(Bundle savedInstanceState)
    {
       //super.init();
        super.onCreate(savedInstanceState);
        
        //db = new MyDatabase(this);
		//users = db.getUsers(); // you would not typically call this on the main thread

        loadUrl(launchUrl);// Set by <content src="index.html" /> in config.xml        
         
    }		
	
	
	public void persistDB(String infile, String outfile){
		AssetManager assets = cordova.getActivity().getAssets();
        
        FileOutputStream outStream = null;
        InputStream inputStream = null;
        
       try {
			inputStream    = assets.open(infile);			
		} catch (FileNotFoundException e1) {
			System.out.println("File not found:" + infile);
		} catch (IOException e) {
			System.out.println("IO Exception:" + infile);
		}
		
		try {
			outStream = new FileOutputStream(outfile);
		} catch (IOException e) {
			System.out.println("IO Exception:" + outfile);
		}
       
        byte[] buffer = new byte[2048];
        int length = 2048;
       
        try {
			while (inputStream.read(buffer, 0, length) > 0)	{
				outStream.write(buffer, 0, length);
			}
		} catch (IOException e) {
			System.out.println("Could not write to file:" + outfile);
		}
        try {
			outStream.flush();
			outStream.close();
	        inputStream.close();
		} catch (IOException e) {
		}       
	}	
	
}


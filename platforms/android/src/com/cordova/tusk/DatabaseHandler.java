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

import android.content.Intent;
import android.os.Bundle;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class DatabaseHandler extends CordovaActivity
{
	//http://devgirl.org/2013/07/17/tutorial-how-to-write-a-phonegap-plugin-for-android/
	
	public static final String ACTION_ADD_CALENDAR_ENTRY = "addCalendarEntry"; 
	public CordovaInterface cordova;
	
	@Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        // Set by <content src="index.html" /> in config.xml
        //loadUrl(launchUrl);
    }
	
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		
		try {
		    if (ACTION_ADD_CALENDAR_ENTRY.equals(action)) { 
		    JSONObject arg_object = args.getJSONObject(0);
		    Intent calIntent = new Intent(Intent.ACTION_EDIT)
		        .setType("vnd.android.cursor.item/event")
		        .putExtra("beginTime", arg_object.getLong("startTimeMillis"))
		        .putExtra("endTime", arg_object.getLong("endTimeMillis"))
		        .putExtra("title", arg_object.getString("title"))
		        .putExtra("description", arg_object.getString("description"))
		        .putExtra("eventLocation", arg_object.getString("eventLocation"));
		 
		       cordova.getActivity().startActivity(calIntent);
		       callbackContext.success();
		       return true;
		    }
		    callbackContext.error("Invalid action");
		    return false;
		} catch(Exception e) {
		    System.err.println("Exception: " + e.getMessage());
		    callbackContext.error(e.getMessage());
		    return false;
		}
	}
}

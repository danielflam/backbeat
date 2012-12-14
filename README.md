backbeat
========

Easy backbone handlebars integration with dynamic view creation

Overview
--------

This tool extends jquery, backbone jqueryUI and handlebars.js, and adds the ability to 
create dynamic views that are attached to jqueryUI objects, even if they are created 
on the fly using handlebars template. This is achieved by using a two step mechanism

1. The HTML is added to the page using a handlebars.js. During this process a list of view schemas are generatedand. 
2. After the handlebars.js generated HTML is loaded, the list of schemas is processed and the views are instantiated, 
   and made operational.


Mechanism
---------

"HandlebarsView" is a object which allows registering objects as helpers. 

This is done with 

HandlebarsView.registerView('ViewName', View);

The view must implement a prototype function that generated the HTML as:

    View.prototype.createView = function (context, options, attributes) {

        var elName = attributes['el'];
        var value = attributes['value'] || "";

        return new Handlebars.SafeString(
                "MY HTML GOES HERE!!"
            );
    }


License
-------

Mervin is made available under both the GPL v2 license and a BSD (3-point) style license. You can select which one you wish to use the DataTables code under.

Copyright (c) 2008-2012, Daniel Flam 
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of Daniel Flam nor NewYorkBrass.com may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

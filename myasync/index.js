
'use strict';
var AWS = require('aws-sdk');

var elasticTranscoder = new AWS.ElasticTranscoder({
    region: 'us-east-1'
});

exports.handler = function(event, context, callback){
    console.log('Welcome malin');

    var key = event.Records[0].s3.object.key;
    console.log(key);

    //the input file may have spaces so replace them with '+'
    var sourceKey = decodeURIComponent(key.replace(/\+/g, ' '));
    console.log(sourceKey);
    //remove the extension
    var outputKey = sourceKey.split('.')[0];
    console.log(outputKey);
    var params = {
        PipelineId: '1497439726319-nbdi8z',
        Input: {
            Key: sourceKey
        },
        Outputs: [
            {
                Key: outputKey + '-1080p' + '.mp4',
                PresetId: '1351620000001-000001' //Generic 1080p
            },
            {
                Key: outputKey + '-720p' + '.mp4',
                PresetId: '1351620000001-000010' //Generic 720p
            },
            {
                Key: outputKey + '-web-720p' + '.mp4',
                PresetId: '1351620000001-100070' //Web Friendly 720p
            }
        ]};

    elasticTranscoder.createJob(params, function(error, data){
        if (error){
            callback(error);
        }
    });
};


/*'use strict'
var AWS = require('aws-sdk');

var elasticTranscoder =new AWS.ElasticTranscoder({
	region: 'us-east-1'
});
exports.handler = function(event, context, callback){
	console.log('Welcome');
	var key = event.Records[0].s3.object.key;

	// the inout file may have space so replace them with '+'
	var sourceKey = decodeURIComponent(key.replace(/\+/g, ' '))

	//remove the extension
	var ouputkey = sourceKey.split('.')[0];

	var params =  {
		PipelineId: '1497439726319-nbdi8z',
		Input: {
			Key: sourceKey
		},
		Ouputs: [
            {
                Key: outputKey + '-1080p' + '.mp4',
                PresetId: '1351620000001-000001' //Generic 1080p
            },
            {
                Key: outputKey + '-720p' + '.mp4',
                PresetId: '1351620000001-000010' //Generic 720p
            },
            {
                Key: outputKey + '-web-720p' + '.mp4',
                PresetId: '1351620000001-100070' //Web Friendly 720p
            }
     ]};
    elasticTranscoder.createJob(params, function(error, data){
    	if(error){
    		callback(error);
    	}
    });
} //1497439726319-nbdi8z

*/
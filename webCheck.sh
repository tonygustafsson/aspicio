#!/bin/bash

function webCheck {
	monitorName=$1;
	url=$2;
	lookfor=$3;

    # Settings
    enableSlack=true;

	# Paths
	logPath=~/webmonitor/log/$(date +"%Y-%m-%d").csv;
	errorLogPath=~/webmonitor/error/$(date +"%Y-%m-%d").csv;
	statusPath=~/webmonitor/status/$monitorName;

	# Get HTTP response from curl
	result=$(curl -Lis -w "\n%{time_total}" "$url");
	loadTime=$(echo "$result" | tail -1);

	if echo "$result" | grep -q "HTTP/1.1 200 OK"
	then
		if echo "$result" | grep -q "$lookfor"
		then
			echo "$(date +"%T");SUCCESS;Server is up;$monitorName;$url;$loadTime;" >> $logPath;

			rm -f "${statusPath}"_*.status;
			touch "${statusPath}_up_${loadTime}.status";
		else
			echo "$(date +"%T");ERROR;Did not contain correct keyword;$monitorName;$url;$loadTime;" >> $logPath;
			echo "$(date +"%T");ERROR;Did not contain correct keyword;$monitorName;$url;$loadTime;" >> $errorLogPath;
			echo "DID NOT FOUND $lookfor IN $url";

			rm -f "${statusPath}"_*.status;
			touch "${statusPath}_down.status";

            if "$enableSlack" = "true"; then
                slackError="$monitorName ($url) did not contain the correct keyword. Is it down? <http://192.168.10.230:3000/|Click here> for more info.";
                curl -X POST --data-urlencode "payload={'username': 'WebMonitor', 'text': '$slackError', 'icon_emoji': ':warning:'}" https://hooks.slack.com/services/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
            fi
        fi
	else
		echo "$(date +"%T");ERROR;Wrong HTTP status;$monitorName;$url;$loadTime;" >> $logPath;
		echo "$(date +"%T");ERROR;Wrong HTTP status;$monitorName;$url;$loadTime;" >> $errorLogPath;
		echo "WRONG HTTP STATUS FOR $url.";

		rm -f "${statusPath}"_*.status;
		touch "${statusPath}_down.status";

        if "$enableSlack" = "true"; then
            slackError="$monitorName ($url) did not respond with HTTP 200 (OK). Is it down? <http://192.168.10.230:3000/|Click here> for more info.";
            curl -X POST --data-urlencode "payload={'username': 'WebMonitor', 'text': '$slackError', 'icon_emoji': ':warning:'}" https://hooks.slack.com/services/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
        fi
	fi
}


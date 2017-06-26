#!/bin/bash

source /home/pi/webmonitor/webCheck.sh

webCheck "starrepublic.com" "http://www.starrepublic.com" "UA-694712-1" &
webCheck "carlsberg.brandstore.net" "http://carlsberg.brandstore.net/Login.aspx" "https://ssl.google-analytics.com/urchin.js" &
webCheck "dawadack.se" "https://www.dawadack.se/" "conversion.js" &
webCheck "gulled.se" "http://www.gulled.se/" "viewModels:" &
webCheck "privab.se" "http://212.16.187.33" "UA-64125396-1" &
webCheck "sandryds.com" "http://94.246.97.160" "/content/img/Sandryds_white.png" &
webCheck "southwest.se" "http://www.southwest.se/" "UA-1275025-3" &

webCheck "ScorettDesktopWeb1" "http://212.16.187.141" "UA-21824617-1" &
webCheck "ScorettDesktopWeb2" "http://212.16.186.109" "UA-21824617-1" &
webCheck "ScorettMobileWeb1" "http://212.16.187.141:1565" "UA-21824617-1" &
webCheck "ScorettMobileWeb2" "http://212.16.186.109:1565" "UA-21824617-1" &
webCheck "store.scorett.se" "http://store.scorett.se" "UA-21824617-1" &

webCheck "KicksDesktopFIWeb1" "http://192.168.200.133:1025" "http://media.kicks.se/Archive/css/style-fi.css" &
webCheck "KicksDesktopFIWeb2" "http://192.168.200.132:1025" "http://media.kicks.se/Archive/css/style-fi.css" &
webCheck "KicksDesktopFIWeb3" "http://192.168.200.136:1025" "http://media.kicks.se/Archive/css/style-fi.css" &
webCheck "KicksDesktopFIWeb4" "http://192.168.200.137:1025" "http://media.kicks.se/Archive/css/style-fi.css" &
#webCheck "KicksDesktopFIWeb5" "http://192.168.200.120:1025" "http://media.kicks.se/Archive/css/style-fi.css" &
#webCheck "KicksDesktopFIWeb6" "http://192.168.200.121:1025" "http://media.kicks.se/Archive/css/style-fi.css" &

webCheck "KicksDesktopNOWeb1" "http://192.168.200.133:1026" "https://media.kicks.se/Archive/css/style-no.css" &
webCheck "KicksDesktopNOWeb2" "http://192.168.200.132:1026" "https://media.kicks.se/Archive/css/style-no.css" &
webCheck "KicksDesktopNOWeb3" "http://192.168.200.136:1026" "https://media.kicks.se/Archive/css/style-no.css" &
webCheck "KicksDesktopNOWeb4" "http://192.168.200.137:1026" "https://media.kicks.se/Archive/css/style-no.css" &
webCheck "KicksDesktopNOWeb5" "http://192.168.200.120:1026" "https://media.kicks.se/Archive/css/style-no.css" &
webCheck "KicksDesktopNOWeb6" "http://192.168.200.121:1026" "https://media.kicks.se/Archive/css/style-no.css" &

webCheck "KicksDesktopSEWeb1" "http://192.168.200.133:80" "https://media.kicks.se/Archive/css/style-se.css" &
webCheck "KicksDesktopSEWeb2" "http://192.168.200.132:80" "https://media.kicks.se/Archive/css/style-se.css" &
webCheck "KicksDesktopSEWeb3" "http://192.168.200.136:80" "https://media.kicks.se/Archive/css/style-se.css" &
webCheck "KicksDesktopSEWeb4" "http://192.168.200.137:80" "https://media.kicks.se/Archive/css/style-se.css" &
webCheck "KicksDesktopSEWeb5" "http://192.168.200.120:80" "https://media.kicks.se/Archive/css/style-se.css" &
webCheck "KicksDesktopSEWeb6" "http://192.168.200.121:80" "https://media.kicks.se/Archive/css/style-se.css" &

webCheck "KicksMobileNOWeb1" "http://192.168.200.133:6565" "https://media.kicks.se/Archive/css/style-no.css" &
webCheck "KicksMobileNOWeb2" "http://192.168.200.132:6565" "https://media.kicks.se/Archive/css/style-no.css" &
webCheck "KicksMobileNOWeb3" "http://192.168.200.136:6565" "https://media.kicks.se/Archive/css/style-no.css" &
webCheck "KicksMobileNOWeb4" "http://192.168.200.137:6565" "https://media.kicks.se/Archive/css/style-no.css" &
webCheck "KicksMobileNOWeb5" "http://192.168.200.120:6565" "https://media.kicks.se/Archive/css/style-no.css" &
webCheck "KicksMobileNOWeb6" "http://192.168.200.121:6565" "https://media.kicks.se/Archive/css/style-no.css" &

webCheck "KicksMobileSEWeb1" "http://192.168.200.133:1027" "https://media.kicks.se/Archive/css/style-se.css" &
webCheck "KicksMobileSEWeb2" "http://192.168.200.132:1027" "https://media.kicks.se/Archive/css/style-se.css" &
webCheck "KicksMobileSEWeb3" "http://192.168.200.136:1027" "https://media.kicks.se/Archive/css/style-se.css" &
webCheck "KicksMobileSEWeb4" "http://192.168.200.137:1027" "https://media.kicks.se/Archive/css/style-se.css" &
webCheck "KicksMobileSEWeb5" "http://192.168.200.120:1027" "https://media.kicks.se/Archive/css/style-se.css" &
webCheck "KicksMobileSEWeb6" "http://192.168.200.121:1027" "https://media.kicks.se/Archive/css/style-se.css" &

webCheck "KicksStoreSEWeb1" "http://192.168.200.133:7711" "https://media.kicks.se/Archive/css/store-se.css" &
webCheck "KicksStoreSEWeb2" "http://192.168.200.132:7711" "https://media.kicks.se/Archive/css/store-se.css" &
webCheck "KicksStoreSEWeb3" "http://192.168.200.136:7711" "https://media.kicks.se/Archive/css/store-se.css" &
webCheck "KicksStoreSEWeb4" "http://192.168.200.137:7711" "https://media.kicks.se/Archive/css/store-se.css" &
webCheck "KicksStoreSEWeb5" "http://192.168.200.120:7711" "https://media.kicks.se/Archive/css/store-se.css" &
webCheck "KicksStoreSEWeb6" "http://192.168.200.121:7711" "https://media.kicks.se/Archive/css/store-se.css" &

webCheck "KicksStoreNOWeb1" "http://192.168.200.133:7712" "https://media.kicks.se/Archive/css/style-no.css" &
webCheck "KicksStoreNOWeb2" "http://192.168.200.132:7712" "https://media.kicks.se/Archive/css/style-no.css" &
webCheck "KicksStoreNOWeb3" "http://192.168.200.136:7712" "https://media.kicks.se/Archive/css/style-no.css" &
webCheck "KicksStoreNOWeb4" "http://192.168.200.137:7712" "https://media.kicks.se/Archive/css/style-no.css" &
webCheck "KicksStoreNOWeb5" "http://192.168.200.120:7712" "https://media.kicks.se/Archive/css/style-no.css" &
webCheck "KicksStoreNOWeb6" "http://192.168.200.121:7712" "https://media.kicks.se/Archive/css/style-no.css" &


#!/bin/bash

### Settings
svn_wk='svn workspace'
#/Users/weited/Documents/workspace/zcmall/static_h5_pd/branches/h5_pdv1.0.0/
svn_user='username'
svn_passwd='password'

### Variables
date=`date +"%F %T"`
svn='/usr/bin/svn'


#### Start automatic commit
# script_path=`dirname $(readlink -f $0)`
script_path="$(cd "$(dirname "$0")" && pwd)"
log="${script_path}/commit.log"
cd $svn_wk
stat=`svn status`

if [[ $stat != '' ]]; then
        # Do we have any files to delete?
        delete_files=`echo $stat | grep '^!'| sed -e 's/! / /g' -e 's/^ *//g'`
        if [[ $delete_files != '' ]]; then
                for file in $delete_files; do
                        svn delete $file >>$log
                done
        fi

        # Do we have any files to add?
        add_files=`echo $stat|grep '^[(M)(\?)]'|sed 's/[(M)(\?)] / /g'`
        if [[ $add_files != '' ]]; then
                for file in $add_files; do
                        svn add $file >>$log
                done
        fi
        #Checkout first
        svn update #>/dev/null 2>>/dev/null
        # Finaly commit
        $svn commit -m "$date - Automatic Update/Commit" --username $svn_user --password $svn_passwd --non-interactive >>$log
fi
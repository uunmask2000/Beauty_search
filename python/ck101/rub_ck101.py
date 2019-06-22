import os
url = 'https://ck101.com/forum.php?mod=forumdisplay&fid=3581&page={}'
for row in range(1, 3):
    url_ = url.format(row)
    cmd = 'C:\\Users\\uunma\\AppData\\Local\\Programs\\Python\\Python37-32\\python.exe ' + \
        "C:\PJ\卡提若\ck101.py " + "'" + str(row) + "'"
    # print(cmd)
    os.system(cmd)

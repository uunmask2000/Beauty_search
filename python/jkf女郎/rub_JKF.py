import os
#
for row in range(1, 2):
    cmd = 'start C:\\Users\\uunma\\AppData\\Local\\Programs\\Python\\Python37-32\\python.exe ' + \
        "C:\PJ\JKF\JKF.py" + " " + str(row) + ""
    print(cmd)
    os.system(cmd)

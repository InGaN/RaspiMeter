import RPi.GPIO as GPIO
import MySQLdb as mdb
import datetime

con = mdb.connect(PYTHON_CONNECT);
sensorPin = 22;

GPIO.setmode(GPIO.BCM)
GPIO.setup(sensorPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

print("Starting sensor...")
try:
        while 1:
#		GPIO.wait_for_edge(sensorPin, GPIO.FALLING)
       # with con:
                #        cur = con.cursor()
                 #       cur.execute(PYTHON_QUERY_INSERT_NOW)
                  #      con.commit()
                   #     print("Sensor triggered!");
        	print(GPIO.input(sensorPin))

except KeyboardInterrupt:
    GPIO.cleanup()

GPIO.cleanup()
	

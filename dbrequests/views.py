from django.shortcuts import render
from django.http import HttpResponse
import psycopg2
import json
import numpy

def index(request):
    return  HttpResponse("Index")

def getEventFactors(request):

    conn = psycopg2.connect(dbname='eventData', user='postgres',
                            password='12345678', host='91.239.26.202', port=5432)
    conn.autocommit = False
    cursor = conn.cursor()

    print("|------------------|")
    print("|Request parameters|")
    print("----------------------------------------")
    print("Event: " + request.GET['event'])
    print("Timestamp: " + request.GET['timestamp'])
    print("----------------------------------------")

    event = request.GET['event']
    timestamp = request.GET['timestamp']

    tableName = 'event' + event + '_' + timestamp + 'factors'

    cursor.execute("SELECT * FROM " + tableName)

    table = cursor.fetchall()

    jsonData = json.dumps(table)

    conn.close()

    return HttpResponse(bytes(jsonData, 'utf-8'))

def getEventPage(request):
    event = request.GET['id']
    timestamp = request.GET['timestamp']

    page = open('/home/sgoncharov/BK/betarchive/getEvent.html','r', encoding='utf-8').read()

    page = page.replace('%id%', event)
    page = page.replace('%timecode%', timestamp)

    return HttpResponse(bytes(page, 'utf-8'))

def getTimecodes(request):

    selectCmd = "SELECT * FROM timecodes"

    conn = psycopg2.connect(dbname='serviceData', user='postgres',
                            password='12345678', host='91.239.26.202', port=5432)
    conn.autocommit = False
    cursor = conn.cursor()

    cursor.execute(selectCmd)
    timecodes_ = cursor.fetchall()

    timecodes = list()

    for t in timecodes_:
        timecodes.append(t)

    jsonData = json.dumps([timecodes])

    return HttpResponse(bytes(jsonData, 'utf-8'))

def getEvents(request):

    timestamp = request.GET['timestamp']
    selectCmd = "SELECT * FROM events WHERE timecode=" + str(timestamp)

    conn = psycopg2.connect(dbname='eventData', user='postgres',
                            password='12345678', host='91.239.26.202', port=5432)
    conn.autocommit = False
    cursor = conn.cursor()

    print('Start')
    cursor.execute(selectCmd)
    print('Execute')
    table = cursor.fetchall()
    print('Fetch')

    eventsDictionary = list()

    cursor.execute("SELECT * FROM teampictures")
    pictable = cursor.fetchall()
    teamPicturesDictionary = dict()
    event = []

    for row in pictable:
        teamPicturesDictionary[row[0]] = row[1]

    for row in table:
        try:
            eventsDictionary.append(
                {"id": row[0], "tourID": row[1], "timestamp": row[2], "team1": row[3], "team2": row[4],
                 "team1pic": teamPicturesDictionary[row[3]], "team2pic": teamPicturesDictionary[row[4]]})
        except:
            eventsDictionary.append(
                {"id": row[0], "tourID": row[1], "timestamp": row[2], "team1": row[3], "team2": row[4],
                 "team1pic": "https://www.logolynx.com/images/logolynx/26/2651ed332aad0a6eb1e1f75319cd87b4.jpeg", "team2pic": "https://www.logolynx.com/images/logolynx/26/2651ed332aad0a6eb1e1f75319cd87b4.jpeg"})

    jsonData = json.dumps([eventsDictionary])
    return HttpResponse(bytes(jsonData, 'utf-8'))


def getEvent(request):
    # test = 'http://localhost:9000/getEvent?id=1&timecode=0&factor=921&parameter=0'

    conn = psycopg2.connect(dbname='eventData', user='postgres',
                            password='12345678', host='91.239.26.202', port=5432)
    conn.autocommit = False
    cursor = conn.cursor()

    event = request.GET['id']
    timestamp = request.GET['timecode']
    factorID = request.GET['factorID']
    parameter = request.GET['p']

    tableName = 'event' + event + '_' + timestamp

    selectCmd = "SELECT f,v,p,pt FROM %tableName% WHERE f=%f%"
    selectCmd = selectCmd.replace('%tableName%', tableName)
    selectCmd = selectCmd.replace('%f%', factorID)
    selectCmd = selectCmd.replace('%p%', parameter)

    cursor.execute(selectCmd)

    table = cursor.fetchall()

    statisticDictionary = list()

    values = list(map(lambda x: x[1], table))

    coefs = list() #numpy.polyfit(list(range(len(values))), values, 100)

    for row in table:
        statisticDictionary.append({"f": row[0], "v": row[1], "p": row[2], "pt": row[3]})

    jsonData = json.dumps([list(coefs), statisticDictionary, len(values)])
    return HttpResponse(bytes(jsonData, 'utf-8'))

def getEventFactors(request):

    conn = psycopg2.connect(dbname='eventData', user='postgres',
                            password='12345678', host='91.239.26.202', port=5432)
    conn.autocommit = False
    cursor = conn.cursor()

    event = request.GET['id']
    timestamp = request.GET['timestamp']

    tableName = 'event' + event + '_' + timestamp + 'factors'

    cursor.execute("SELECT * FROM " + tableName)

    table = cursor.fetchall()

    jsonData = json.dumps(table)
    return HttpResponse(bytes(jsonData, 'utf-8'))

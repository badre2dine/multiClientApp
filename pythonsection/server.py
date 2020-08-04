from flask import Flask
import threading
import time

app = Flask(__name__)
k=1
threads=[]
def thread_function(name):
    t = threading.currentThread()
    while getattr(t, "do_run", True):
        print("work ",name)
        time.sleep(name)

@app.route('/strat')
def hello_world():
    global k
    global threads
    threads.append(threading.Thread(target=thread_function, args=(k,)))

 

    threads[k-1].start()
    
    k=k+1
    print (threading.active_count())
    return {"k": k-1}

@app.route('/stop')
def stop():
    global k
    global threads
    threads[k-2].do_run = False
    threads.pop(k-2)
    k=k-1
    return 'stop'
app.run(debug=True)


    
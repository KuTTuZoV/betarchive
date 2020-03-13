from django.http import HttpResponse

def index(request):

    indexPage = open("/home/sgoncharov/BK/betarchive/startPage/index.html", "rb")

    body = indexPage.read()

    return HttpResponse(body)

# Create your views here.

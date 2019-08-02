from django.shortcuts import render
from django.http import HttpResponse
from .models import Posts

# Create your views here.
def index(request):
    posts = Posts.objects.all()[:10]
    context = {
        'title': 'Latest Posts',
        'posts': posts
    }

    return render(request, 'posts/index.html', context)

def details(request, id):
    post_detail = Posts.objects.get(id=id)
    context = {
        'title': post_detail.title,
        'post': post_detail
    }

    return render(request, 'posts/detail.html', context)

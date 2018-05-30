from django.conf.urls import url

from app.views import Index, APINotes, APINotesDetail

urlpatterns = [
    url(r'^notes/$', APINotes.as_view(), name='notes'),
    url(r'^notes/(?P<pk>[0-9]+)/$', APINotesDetail.as_view(), name='note-detail'),
]

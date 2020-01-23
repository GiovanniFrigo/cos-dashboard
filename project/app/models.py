from django.db import models

# Create your models here.
class CurrentNumber(models.Model):
    playerCount = models.IntegerField(blank=True, null=True)
    createDate = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return "{}".format(self.createDate)

    def __unicode__(self):
        return "{}".format(self.createDate)


class News(models.Model):
    title = models.TextField(blank=True, null=True)
    text = models.TextField(blank=True, null=True)

    def __str__(self):
        return "{}".format(self.title)

    def __unicode__(self):
        return "{}".format(self.title)

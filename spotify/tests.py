from django.test import TestCase, Client
from django.urls import reverse
from api.models import Room


class SpotifyAPITests(TestCase):
    def setUp(self):
        self.client = Client()
        session = self.client.session
        session.save()
        self.room = Room.objects.create(
            host=session.session_key,
            guest_can_pause=True,
            votes_to_skip=1
        )
        self.session_key = session.session_key

    def test_current_song_view(self):
        response = self.client.get('/spotify/current-song')
        
        self.assertIn(response.status_code, [200, 204])

    def test_play_pause_skip_endpoints(self):
        endpoints = ['/spotify/play', '/spotify/pause', '/spotify/skip']
        for endpoint in endpoints:
            data = {'code': self.room.code}
            response = self.client.put(endpoint, data, content_type='application/json')
            self.assertIn(response.status_code, [200, 204, 403])

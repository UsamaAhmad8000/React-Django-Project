from django.test import TestCase, Client
from django.urls import reverse
from .models import Room


class RoomAPITests(TestCase):
    def setUp(self):
        self.client = Client()
        session = self.client.session
        session.save()
        self.session_key = session.session_key
        self.room = Room.objects.create(
            host=self.session_key,
            guest_can_pause=True,
            votes_to_skip=1
        )

    def test_update_room_by_host(self):
        data = {
            'code': self.room.code,
            'guest_can_pause': False,
            'votes_to_skip': 3
        }
        response = self.client.patch('/api/update-room', data, content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_join_room(self):
        data = {'code': self.room.code}
        response = self.client.put('/api/join-room', data, content_type='application/json')
        self.assertEqual(response.status_code, 200)

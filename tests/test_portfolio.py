import os
import unittest
from playwright.sync_api import sync_playwright, expect

class TestPortfolio(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.pw = sync_playwright().start()
        cls.browser = cls.pw.chromium.launch(headless=True, args=['--no-sandbox'])

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.pw.stop()

    def setUp(self):
        self.page = self.browser.new_page()

    def tearDown(self):
        self.page.close()

    def test_portfolio_load(self):
        # Get absolute path to index.html
        path = os.path.abspath("docs/index.html")
        # Use file:// protocol to load the local file
        self.page.goto(f"file://{path}", wait_until="commit")

        # Verify the page title
        expect(self.page).to_have_title("Sung Hun Kwag - Advanced AI Research Portfolio")

        # Verify the main heading is present and has correct text
        heading = self.page.locator("#static-title-container .plate-main-text")
        expect(heading).to_have_text("ADVANCED AI SYSTEM")

        # Verify the English name is present and correct
        name = self.page.locator(".eng-name")
        expect(name).to_have_text("Sung Hun Kwag")

        # Verify that all 6 portfolio cards are rendered
        cards = self.page.locator(".glass-card")
        expect(cards).to_have_count(6)

if __name__ == "__main__":
    unittest.main()

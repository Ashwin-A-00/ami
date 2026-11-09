.PHONY: assets wireframes zip
assets:     ; python3 tools/build_assets.py
wireframes: ; python3 tools/build_wireframes.py
zip: assets wireframes
	mkdir -p dist && rm -f dist/*.zip
	zip -qr dist/ami-repo.zip . -x 'dist/*' '.git/*'
	zip -qr dist/ami-design-handoff.zip design-handoff

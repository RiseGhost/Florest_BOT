cmd_Release/Units.node := ln -f "Release/obj.target/Units.node" "Release/Units.node" 2>/dev/null || (rm -rf "Release/Units.node" && cp -af "Release/obj.target/Units.node" "Release/Units.node")

cmd_Release/CloneCode.node := ln -f "Release/obj.target/CloneCode.node" "Release/CloneCode.node" 2>/dev/null || (rm -rf "Release/CloneCode.node" && cp -af "Release/obj.target/CloneCode.node" "Release/CloneCode.node")

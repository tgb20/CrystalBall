package gg.tgb.CrystalBall;

import io.javalin.core.JavalinConfig;
import io.javalin.websocket.WsContext;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.World;
import org.bukkit.block.Block;
import org.bukkit.entity.Player;
import org.bukkit.plugin.java.JavaPlugin;
import io.javalin.Javalin;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.ArrayList;

public class CrystalBall extends JavaPlugin {


    private int searchRadius = 30;
    private Location playerPos;

    private JSONObject blockJSON = new JSONObject();

    private ArrayList<WsContext> wsContexts = new ArrayList<>();

    @Override
    public void onEnable() {
        System.out.println("Crystal Ball is Starting");

        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        Thread.currentThread().setContextClassLoader(Javalin.class.getClassLoader());
        Javalin app = Javalin.create(JavalinConfig::enableCorsForAllOrigins).ws("/ws", ws -> {
            ws.onConnect(ctx -> {
                System.out.println("Connected");
                wsContexts.add(ctx);
            });

            ws.onClose(ctx -> {
                wsContexts.remove(ctx);
            });

        }).start(25569);
        app.config.addStaticFiles("/public");
        Thread.currentThread().setContextClassLoader(classLoader);

        Bukkit.getScheduler().scheduleSyncRepeatingTask(this, new Runnable() {
            @Override
            public void run() {
                blockJSON = blockListToJSON(getBlockList());
                for (WsContext wsContext: wsContexts) {
                    wsContext.send(blockJSON);
                }
            }
        }, 20, 2);

    }

    @Override
    public void onDisable() {
        System.out.println("Crystal Ball is Stopping");
    }

    public JSONObject blockListToJSON(Block[] blockList) {
        JSONObject blocks = new JSONObject();

        for(int i = 0; i < blockList.length; i++) {
            Block b = blockList[i];

            String type = b.getType().name();
            int x = (int) playerPos.getX() - b.getX();
            int y = (int) playerPos.getY() - b.getY();
            int z = (int) playerPos.getZ() - b.getZ();


            if(blocks.containsKey(type)) {
                JSONObject block = new JSONObject();
                block.put("x", x);
                block.put("y", y);
                block.put("z", z);
                JSONArray arr = (JSONArray) blocks.get(type);
                arr.add(block);
            } else {
                JSONArray newTypeArray = new JSONArray();
                JSONObject block = new JSONObject();
                block.put("x", x);
                block.put("y", y);
                block.put("z", z);
                newTypeArray.add(block);
                blocks.put(type, newTypeArray);
            }
        }

        JSONObject finalJSON = new JSONObject();
        finalJSON.put("blocks", blocks);

        return finalJSON;
    }


    public Block[] getBlockList() {

        if(Bukkit.getServer().getPlayer("tgb0") != null) {
            Player p = Bukkit.getServer().getPlayer("tgb0");
            playerPos = p.getLocation();

            World pWorld = playerPos.getWorld();
            int pX = (int) playerPos.getX();
            int pY = (int) playerPos.getY();
            int pZ = (int) playerPos.getZ();

            ArrayList<Block> blocks = new ArrayList<Block>();

            int yLimit = pY - searchRadius;

            if(yLimit < 62) {
                yLimit = 62;
            }


            for(int x = pX-searchRadius; x < pX+searchRadius; x++) {
                for(int y = yLimit; y < pY+searchRadius; y++) {
                    for(int z = pZ-searchRadius; z < pZ+searchRadius; z++) {
                        Block b = pWorld.getBlockAt(new Location(pWorld, x, y, z));

                        if(b.getType().equals(Material.AIR) || b.getType().equals(Material.CAVE_AIR) || b.getType().equals(Material.VOID_AIR)) {
                            continue;
                        }

                        int airCount = 0;
                        for(int nX = x-2; nX < x+2; nX++) {
                            for(int nY = y-2; nY < y+2; nY++) {
                                for(int nZ = z-2; nZ < z+2; nZ++) {
                                    Block n = pWorld.getBlockAt(new Location(pWorld, nX, nY, nZ));
                                    if(n.getType().equals(Material.AIR) || n.getType().equals(Material.CAVE_AIR)) {
                                        airCount++;
                                    }
                                }
                            }
                        }
                        if(airCount == 0) {
                            continue;
                        }

                        blocks.add(b);
                    }
                }
            }
            Block[] blockList = new Block[blocks.size()];
            blockList = blocks.toArray(blockList);
            return blockList;
        }

        return new Block[0];
    }
}

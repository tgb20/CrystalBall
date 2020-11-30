package gg.tgb.CrystalBall;

import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.World;
import org.bukkit.block.Block;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerMoveEvent;
import org.bukkit.plugin.java.JavaPlugin;
import io.javalin.Javalin;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.ArrayList;

public class CrystalBall extends JavaPlugin implements Listener {


    private int searchRadius = 10;

    private Block[] blockList;
    private Location playerPos;

    @Override
    public void onEnable() {
        getServer().getPluginManager().registerEvents(this, this);
        System.out.println("Crystal Ball is Starting");

        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        Thread.currentThread().setContextClassLoader(Javalin.class.getClassLoader());
        Javalin app = Javalin.create(config -> {
            config.enableCorsForAllOrigins();
        }).start(25599);
        app.config.addStaticFiles("/public");
        app.get("/blocks", ctx -> {


            JSONArray blocksArray = new JSONArray();

            for(int i = 0; i < blockList.length; i++) {
                Block b = blockList[i];

                String type = b.getType().name();
                int x = (int) playerPos.getX() - b.getX();
                int y = (int) playerPos.getY() - b.getY();
                int z = (int) playerPos.getZ() - b.getZ();

                JSONObject jsonBlock = new JSONObject();

                jsonBlock.put("type", type);
                jsonBlock.put("x", x);
                jsonBlock.put("y", y);
                jsonBlock.put("z", z);

                blocksArray.add(jsonBlock);
            }

            JSONObject finalJSON = new JSONObject();

            JSONObject playerJSON = new JSONObject();
            playerJSON.put("x", playerPos.getX());
            playerJSON.put("y", playerPos.getY());
            playerJSON.put("z", playerPos.getZ());

            finalJSON.put("blocks", blocksArray);
            finalJSON.put("player", playerJSON);

            ctx.json(finalJSON);
        });
        Thread.currentThread().setContextClassLoader(classLoader);
    }

    @Override
    public void onDisable() {
        System.out.println("Crystal Ball is Stopping");
    }


    @EventHandler
    public void onPlayerMove(PlayerMoveEvent event) {

        if(event.getPlayer().getName().equalsIgnoreCase("tgb0")) {

            playerPos = event.getPlayer().getLocation();

            World pWorld = playerPos.getWorld();
            int pX = (int) playerPos.getX();
            int pY = (int) playerPos.getY();
            int pZ = (int) playerPos.getZ();

            ArrayList<Block> blocks = new ArrayList<Block>();

            for(int x = pX-searchRadius; x < pX+searchRadius; x++) {
                for(int y = pY-searchRadius; y < pY+searchRadius; y++) {
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
                                    if(n.getType().equals(Material.AIR)) {
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
            blockList = new Block[blocks.size()];
            blockList = blocks.toArray(blockList);
        }
    }
}
